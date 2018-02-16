import { Component } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { DeviceService } from '@core/device/device.service';
import { I18nService } from '@core/i18n/i18n.service';
import { LoggerService } from '@core/logger/logger.service';
import { TabsPage } from '@pages/tabs/tabs';
import { App, Nav, ViewController } from 'ionic-angular';

@Component({
    selector: 'modal-start',
    templateUrl: 'start.html'
})
export class StartModal {
    public status: string;

    constructor(
        private viewController: ViewController,
        private configService: ConfigService,
        private deviceService: DeviceService,
        private i18nService: I18nService,
        private logger: LoggerService,
        private appController: App
    ) {

        this.status = 'Loading...';

        // TODO:; Cambiare da Promise ad observer per inviare gli status di cosa si sta configurando
        // renderndo il caricamento più interattivo
        Promise.all([
            this.configService.initCompleted,
            this.i18nService.initCompleted
        ]).then(
            () => {
                this.navTo(TabsPage);
            },
            (err: Error) => {
                this.deviceService.alert(err.message);
            }
        )

        // Hide splash after modal is completly loaded
        const viewSubscriber = this.viewController.didEnter.subscribe(
            () => {
                this.deviceService.styleStatusBarAsDefault();
                this.deviceService.hideSplashscreen();
                viewSubscriber.unsubscribe();
            }
        )
    }

    navTo(page: any) {
        setTimeout(() => {
            const viewSubscriber = (<Nav>this.appController.getRootNav()).viewDidLoad.subscribe(
                () => {
                    this.viewController.dismiss();
                    viewSubscriber.unsubscribe();
                }
            );
            this.appController.getRootNav().push(page);
        }, 1000);
    }
}
