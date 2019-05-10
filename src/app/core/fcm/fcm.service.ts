import { Injectable } from '@angular/core';
import { DeviceService } from '@core/device';
import { AppNotification, PopoverPush, TopicNames } from '@core/fcm';
import { LoggerService } from '@core/logger';
import { ENV } from '@env';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';
import { PopoverController } from 'ionic-angular';
import { remove, union } from 'lodash';
import { BehaviorSubject } from 'rxjs/Rx';

const storageKeys = {
    infoSecEnabled: 'infoSecEnabled',
    subscriptions: 'subscriptions'
};

@Injectable()
export class FCMService {
    private storage!: Storage;
    private infoSecEnabled: boolean = true;
    private subscriptions: string[] = [];

    public onPushArrives$: BehaviorSubject<AppNotification> = new BehaviorSubject<AppNotification>({});

    constructor(
        private logger: LoggerService,
        private firebase: Firebase,
        private deviceService: DeviceService,
        private popoverCtrl: PopoverController
    ) {
        const _self = this;

        this.storage = new Storage({
            name: ENV.storePrefix,
            storeName: 'push',
            driverOrder: ['localstorage']
        });

        // Read the last settings for INFO_SEC push notifications
        this.storage.get(storageKeys.infoSecEnabled).then((infoSecEnabled: boolean) => {
            if (typeof infoSecEnabled === 'undefined' || infoSecEnabled === null) {
                // If there is no previous flag for INFO_SEC topic read the current permission in order to enable/disable it
                _self.hasPermission().then((data) => {
                    _self.toggleInfoSecSubscription(data.isEnabled);
                })
            }
            else {
                _self.infoSecEnabled = infoSecEnabled;
                _self.toggleInfoSecSubscription(_self.infoSecEnabled);
            }
        });

        // Read the last subscriptions list from storage (if exists)
        this.storage.get(storageKeys.subscriptions).then((subscriptions: string[]) => {
            if (subscriptions) {
                _self.subscriptions = subscriptions;
            }
            else {
                _self.storage.set(storageKeys.subscriptions, []);
            }
        });
    }

    /**
     * Wait for LokiJS DB loaded and init the notifications collection
     */
    public init(): void {
        let _self = this;
        if (this.deviceService.isCordova()) {
            // Disable all Firebase trackers
            this.firebase.setAnalyticsCollectionEnabled(false);

            this.firebase.getToken().then(
                (token: string) => {
                    _self.storage.set('fcm_token', token);
                    _self._startSubscriptions();
                },
                (err: Error) => {
                    _self.logger.error(err.message);
                }
            )
            this.firebase.onTokenRefresh().subscribe(
                (token: string) => {
                    _self.storage.set('fcm_token', token);
                    _self._startSubscriptions();
                },
                (err: Error) => {
                    _self.logger.error(err);
                }
            );
            // Every push notification arrived from FCM will be managed here
            this.firebase.onNotificationOpen().subscribe((notification: EUCouncilNotification) => {
                _self.logger.debug('FCMService:parseNotification', notification);
                try {
                    // If the push notification arrived has been tapped by user emit notification via onPushArrives$
                    if (notification.tap) {
                        _self.onPushArrives$.next(notification);
                    }
                    // Otherwise show the NotificationPopover
                    else {
                        // The cordova-plugin-firebase 2.0.5 in iOS
                        // open the native notification's banner also in foreground
                        // so don't do anything
                        if (_self.deviceService.isIos()) {

                        }
                        // Otherwise (in Android) open the ForegroundPopoverPush
                        else {
                            _self._openForegroundPopoverPush(notification, () => {
                                // If the user tapped on it emit notification via onPushArrives$
                                _self.onPushArrives$.next(notification);
                            });
                        }
                    }
                } catch (err) {
                    this.logger.error(err);
                }
            });
            // For iOS device ask for push notification permission and initialize the INFO_SEC topic subscription
            if (this.deviceService.isIos()) {
                this.firebase.grantPermission().then(
                    () => {
                        _self.toggleInfoSecSubscription(true);
                    },
                    () => {
                        _self.toggleInfoSecSubscription(false);
                    }
                );
            }
        }
    }

    /**
     * Start subscription to all previously activated topic
     */
    private _startSubscriptions(): void {
        // If INFO_SEC topic is enabled subscribe to that topic
        if (this.infoSecEnabled) {
            this._subscribeToInfoSecTopic();
        }
        // Subscribe to all other agenda/agenda-item topics
        this.subscriptions.forEach((topic: string) => {
            this.firebase.subscribe(topic);
        });
    }

    /**
     * Subscribe to INFO_SEC general topic
     */
    private _subscribeToInfoSecTopic(): void {
        this.firebase.subscribe(TopicNames.INFO_SEC);
    }

    /**
     * Unsubscribe from INFO_SEC general topic
     */
    private _unsubscribeFromInfoSecTopic(): void {
        this.firebase.unsubscribe(TopicNames.INFO_SEC);
    }

    /**
     * Get if INFO_SEC topic is enabled in preferences panel
     */
    public checkInfoSecSubscription(): boolean {
        return this.infoSecEnabled;
    }

    /**
     * Enable/Disable INFO_SEC push notifications from preferences panel
     * and subscribe/unsubscribe from INFO_SEC topic
     * @param  {boolean} subscribe
     */
    public toggleInfoSecSubscription(subscribe: boolean): void {
        this.infoSecEnabled = subscribe;
        this.storage.set(storageKeys.infoSecEnabled, this.infoSecEnabled);
        if (this.deviceService.isCordova()) {
            if (subscribe) {
                this._subscribeToInfoSecTopic();
            }
            else {
                this._unsubscribeFromInfoSecTopic();
            }
        }
    }

    private _openForegroundPopoverPush(notification: EUCouncilNotification, openPushOpen: Function): void {
        let popover = this.popoverCtrl.create(
            PopoverPush,
            {
                notification: notification,
                onOpen: openPushOpen
            },
            {
                cssClass: 'popover-push', showBackdrop: false, enableBackdropDismiss: false
            });

        popover.present({
            ev: {
                target: {
                    getBoundingClientRect: () => {
                        return {
                            top: 0,
                            left: 0
                        };
                    }
                }
            }
        });
    }

    /**
     * Check the push notification permission
     * @returns {Promise<{isEnabled: boolean}>}
     */
    public hasPermission(): Promise<{isEnabled: boolean}> {
        if (this.deviceService.isCordova()) {
            return this.firebase.hasPermission();
        }
        else {
            return Promise.resolve({isEnabled: true});
        }
    }

    /**
     * Subscribe for push notification's topic
     * @param  {string} topic
     * @returns Promise
     */
    public subscribeToTopic(topic: string): Promise<any> {
        return this.firebase.subscribe(topic).then(
            () => {
                this.subscriptions = union(this.subscriptions, [topic]);
                this.storage.set(storageKeys.subscriptions, this.subscriptions);
                return Promise.resolve();
            },
            (err: Error|string) => {
                if (typeof err === 'string') {
                    err = new Error(err);
                }
                this.logger.error(err);
                return Promise.reject(err);
            });
    }

    /**
     * unsubscribe for push notification's topic
     * @param  {string} topic
     * @returns Promise
     */
    public unsubscribeFromTopic(topic: string): Promise<any> {
        return this.firebase.unsubscribe(topic).then(
            () => {
                this.subscriptions = remove(this.subscriptions, (t: string) => {
                    return t === topic;
                });
                this.storage.set(storageKeys.subscriptions, this.subscriptions);
                return Promise.resolve();
            },
            (err: Error|string) => {
                if (typeof err === 'string') {
                    err = new Error(err);
                }
                this.logger.error(err);
                return Promise.reject(err);
            });
    }

    /**
     * Reset the native push counter in os launcher
     */
    public resetAppBadge(): void {
        if (this.deviceService.isCordova()) {
            this.firebase.setBadgeNumber(0);
        }
    }
}
