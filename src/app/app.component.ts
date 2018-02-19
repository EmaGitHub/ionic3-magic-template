import { Component } from '@angular/core';
import { Starter } from '@app/starter/starter';
import { ConfigService } from '@core/config/config.service';
import { I18nService } from '@shared/i18n/i18n.service';
import { ModalController, Platform } from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class App {
    rootPage: any;

    constructor(
        private platform: Platform,
        private modalController: ModalController,
        // tslint:disable-next-line
        private configService: ConfigService,
        // tslint:disable-next-line
        private i18nService: I18nService
    ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            // Show modal to start to initialize the app
            let startingModal = this.modalController.create(Starter, null, {
                showBackdrop: false,
                enableBackdropDismiss: false,
                cssClass: 'fullscreen'
            });
            startingModal.present();
        });
    }
}
