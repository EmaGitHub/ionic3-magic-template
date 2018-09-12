import { Component } from '@angular/core';
import { TabsService } from '@app/tabs';
import { ConfigService } from '@core/config';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger';
import { PushNotificationsService } from '@core/push-notifications';
import { UserService } from '@core/user';
import { VersioningService } from '@core/versioning';
import { I18nService } from '@shared/i18n';

@Component({
    selector: 'app-starter',
    templateUrl: 'starter.html'
})
export class Starter {
    public status: string = '';

    constructor(
        private tabsService: TabsService,
        private configService: ConfigService,
        private deviceService: DeviceService,
        private i18nService: I18nService,
        private logger: LoggerService,
        private userService: UserService,
        private pushNotificationsService: PushNotificationsService,
        private versioningService: VersioningService
    ) {

    }

    ionViewDidEnter(){
        this.status = null;

        // Wait for config and translations configurations completed
        let servicesToWait = [
            this.configService.initCompleted,
            this.i18nService.initCompleted
        ];
        // If the app can make an autologin also wait for
        // push notification complete because after login the app calls the API
        if(!this.userService.isFirstAccess()){
            servicesToWait.push(this.pushNotificationsService.initCompleted);
        }

        Promise.all(servicesToWait).then(
            () => {
                this.versioningService.checkVersioning().then(
                    () => {
                        this.logger.debug('initialize completed');
                        // Try autologin
                        this.userService.autologin().then(
                            () => {
                                this.loadTabsPage();
                            },
                            () => {
                                this.loadTabsPage();
                            }
                        )
                    },
                    (err: Error) => {
                        this.status = err.message;
                        this.deviceService.hideSplashscreen();
                    }
                );
            },
            (err: Error) => {
                this.status = err.message;
                this.deviceService.hideSplashscreen();
            }
        )
    }

    /**
     * Go to tabsPage if not already exists
     */
    private loadTabsPage(){
        this.tabsService.loadTabsPage();
    }
}
