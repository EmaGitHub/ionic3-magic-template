import { Component } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { TranslatorService } from '@core/translator/translator.service';
import { StartModal } from '@modals/start/start';
import { ModalController, Platform } from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class App {
    rootPage: any;

    constructor(
        private platform: Platform,
        private modalController: ModalController,
        private configService: ConfigService,
        private translatorService: TranslatorService
    ) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.

            // Show modal to start to initialize the app
            let startingModal = this.modalController.create(StartModal, null, {
                showBackdrop: false,
                enableBackdropDismiss: false,
                cssClass: 'fullscreen'
            });
            startingModal.present();
        });
    }
}
