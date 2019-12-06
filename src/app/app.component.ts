import { Component, ViewChild } from '@angular/core';
import { Starter } from '@app/starter/starter';
import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { Platform, NavController,} from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppStore } from './app-store';
import { UserState } from './core/user/models/user-state';
import { StatusBar } from '@ionic-native/status-bar';
import { LokiDatabaseService } from './core/lokijs-database/LokiDBService';

@Component({
    templateUrl: 'app.html'
})
export class App extends AutoUnsubscribe {

    @ViewChild('nav') navCtrl?: NavController;

    public rootPage: any = Starter;
    public userIsNotLogged: boolean = false;

    private userSubscription$?: Store<UserState>;
    public userLogged: boolean = false;
    private exitDialogVisible: boolean = false;

    constructor(
        private platform: Platform,
        private deviceService: DeviceService,
        private userService: UserService,
        private store: Store<AppStore>,
        private statusBar: StatusBar,
        private lokiDatabasesService: LokiDatabaseService,
    ) {
        super();
        this.platform.ready().then(() => {
            this.initOrientation();
            this.initLogoutSubscriptions();
            this.initUserSubscription();
            this.statusBar.backgroundColorByHexString("#FFF");
            this.statusBar.styleDefault();
            this.lokiDatabasesService.initDB();
            this.deviceService.hideSplashscreen();
            this.platform.registerBackButtonAction(() => {
                this.exitConfirm();
            });
        });
    }

    /**
     * Initialize the native device orientation
     */
    public initOrientation(): void {
        // If device is tablet activate split view and unlock orientation
        if (this.deviceService.isTablet()) {
            if (this.deviceService.isCordova()) {
                this.deviceService.unlockOrientation();
            }
        }
        // Otherwise deactivate split view and lock orientation in portrait
        else if (this.deviceService.isCordova()) {
            this.deviceService.lockOrientation(this.deviceService.ORIENTATIONS.PORTRAIT_PRIMARY);
        }
    }

    /**
     * Initialize subscription for logout events in order to hide the app's content
     */
    public initLogoutSubscriptions(): void {
        this.userService.onSessionChanges$
            .takeUntil(this.destroy$)
            .subscribe((loginState: number) => {
                this.userIsNotLogged = (loginState === LoginStates.LOGOUT || loginState === LoginStates.THROW_OUT);
            });
    }

    public initUserSubscription() {

        this.userSubscription$ = this.store.select('userState');
        this.userSubscription$.subscribe((state: any) => {

            if(state.logged == true) this.userLogged = true;
            else this.userLogged = false;
        })
    }

    exitConfirm() {

        if (this.exitDialogVisible == false) {
            this.deviceService.confirm("Do you really want to close app?", {
                title: 'Exit confirm', buttons: [{
                    text: 'CANCEL',
                    cssClass: 'primary',
                    role: 'cancel',
                    handler: () => {
                        this.exitDialogVisible = false;
                     }
                }, {
                    text: 'OK',
                    cssClass: 'primary',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }]
            });
            this.exitDialogVisible = true;
        }

    }
}
