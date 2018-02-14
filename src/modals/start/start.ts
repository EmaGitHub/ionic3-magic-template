import { Component } from '@angular/core';
import { TabsPage } from '@pages/tabs/tabs';
import { ConfigService } from '@services/config/config.service';
import { DeviceService } from '@services/device/device.service';
import { App, Nav, ViewController } from 'ionic-angular';

@Component({
    selector: 'modal-start',
    templateUrl: 'start.html'
})
export class StartModal {
    private status: string;

    constructor(
        private viewController: ViewController,
        private configService: ConfigService,
        private deviceService: DeviceService,
        private appController: App
    ) {

        this.status = 'Loading...';

        // When modal is ready
        // this.navController.viewDidEnter.subscribe(
        //     () => {

                // Downlaod config file
                this.configService.update().then(
                    () => {
                        setTimeout(() => {
                            const viewSubscriber = (<Nav>this.appController.getRootNav()).viewDidLoad.subscribe(
                                () => {
                                    this.viewController.dismiss();
                                    viewSubscriber.unsubscribe();
                                }
                            );
                            this.appController.getRootNav().push(TabsPage);
                        }, 1000);
                    },
                    (err: Error) => {
                        this.deviceService.alert(err.message);
                    }
                )
        //     }
        // );

        // Hide spalsh after modal is completly loaded
        const viewSubscriber = this.viewController.didEnter.subscribe(
            () => {
                this.deviceService.styleStatusBarAsDefault();
                this.deviceService.hideSplashscreen();
                viewSubscriber.unsubscribe();
            }
        )
    }
}
