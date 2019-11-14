import { Component } from '@angular/core';
import { TabsService } from '@app/tabs';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger';
import { UserService } from '@core/user';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public username: string = '';
    public password: string = '';

    constructor(
        private logger: LoggerService,
        private userService: UserService,
        private deviceService: DeviceService,
        private tabsService: TabsService,
        private viewCtrl: ViewController,
        private inAppBrowser: InAppBrowser,
    ) { }

    public onLoginSubmit(): void {
        this.logger.debug(`credentials ${this.username}/${this.password}`);
        this.deviceService.showLoading();
        this.userService.login(this.username, this.password).then(
            () => {
                this.deviceService.hideLoading();
                this.userService.setFirstAccess();
                this.tabsService.loadTabsPage();
                this.closeModal();
            },
            (err: Error) => {
                this.deviceService.hideLoading();
                this.deviceService.alert(err.message);
            },
        );
    }

    public onForgotPasswordClicked(): void {
        this.inAppBrowser.create('https://forgotpassword.test.com', '_system');
    }

    /**
     * Close login modal
     */
    public closeModal(): void {
        this.viewCtrl.dismiss();
    }
}
