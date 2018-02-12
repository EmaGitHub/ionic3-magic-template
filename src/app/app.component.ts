import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ConfigService } from '@services/config/config.service';
import { DeviceService } from '@services/device/device.service';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
    templateUrl: 'app.html'
})
export class App {
    rootPage:any = TabsPage;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private configService: ConfigService,
        private deviceService: DeviceService,
    ) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            // Downlaod config file
            this.configService.update().then(
                () => {
                    this.deviceService.styleStatusBarAsDefault();
                    this.deviceService.hideSplashscreen();
                },
                (err: Error) => {
                    this.deviceService.alert(err.message);
                }
            )
        });
    }
}
