import { Component } from '@angular/core';
import { DeviceService } from '@core/device/device.service';
import { I18nService } from '@shared/i18n/i18n.service';
import { NavController } from 'ionic-angular';

import { HomeService } from './home.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    selectedLanguage = 'en';

    constructor(
        public navCtrl: NavController,
        public i18nService: I18nService,
        public homeService: HomeService,
        public deviceService: DeviceService
    ) { }

    ionViewDidLoad(){
        const currentLang = this.i18nService.getCurrentLanguage();
        if(currentLang){
            this.selectedLanguage = currentLang.code;
        }
    }

    test() {
        this.homeService.recuperaRoba();
    }

    changeLang(lang:string) {
        console.log('lingua da impostare', lang);
        this.i18nService.setLanguage(lang);
    }

    testLang() {
        this.deviceService.alert('HELLO');
    }
}
