import { Component } from '@angular/core';
import { TabsService } from '@app/tabs';
import { ConfigService } from '@core/config';
import { DeviceService } from '@core/device';
import { FCMService } from '@core/fcm';
import { LoggerService } from '@core/logger';
import { UserService } from '@core/user';
import { VersioningService } from '@core/versioning';
import { I18nService } from '@shared/i18n';
import { LoginService } from '@app/login';

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
        private fcmService: FCMService,
        private versioningService: VersioningService,
        private loginService: LoginService
    ) {

    }

    public ionViewDidEnter(): void {
        this.status = '';

        // Wait for config and translations configurations completed
        let servicesToWait = [
            this.configService.initCompleted,
            this.i18nService.initCompleted
        ];

        Promise.all(servicesToWait).then(
            () => {
                this.versioningService.checkVersioning().then(
                    () => {
                        this.logger.debug('Initialize completed');
                        // Try autologin
                        console.log("try autologin")
                        this.userService.autologin().then(
                            () => {
                                console.log("Autologin success")
                                this.deviceService.hideSplashscreen();
                                this._loadTabsPage();
                            },
                            (error: Error) => {
                                console.log("Autologin failed: ",error)
                                this.deviceService.hideSplashscreen();
                                this.loginService.openMainLogin();
                            }
                        )
                    },
                    (err: Error) => {
                        console.log("Autologin error: ",err)
                        this.status = err.message;
                        this.deviceService.hideSplashscreen();
                    }
                );
            },
            (err: Error) => {
                console.log("Starter serviceToWait error: ",err)
                this.status = err.message;
                this.deviceService.hideSplashscreen();
            }
        )
    }

    /**
     * Go to tabsPage if not already exists
     */
    private _loadTabsPage(): void {
        this.tabsService.loadTabsPage();
    }
}
