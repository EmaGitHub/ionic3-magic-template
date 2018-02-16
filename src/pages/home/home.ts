import { Component } from '@angular/core';
import { I18nService } from '@core/i18n/i18n.service';
import { HomeService } from '@pages/home/home.service';
import { NavController } from 'ionic-angular';

// import { ConfigService } from '@core/config/config.service';
// import { ApiService } from '@core/api/api.service';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    selectedLanguage = 'en';

    constructor(
        public navCtrl: NavController,
        public i18nService: I18nService,
        public homeService: HomeService
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
}
