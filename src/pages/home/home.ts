import { Component } from '@angular/core';
import { TranslatorService } from '@core/translator/translator.service';
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
        public translator: TranslatorService,
        public homeService: HomeService
    ) { }

    ionViewDidLoad(){
        const currentLang = this.translator.getCurrentLanguage();
        if(currentLang){
            this.selectedLanguage = currentLang.code;
        }
    }

    test() {
        this.homeService.recuperaRoba();
    }

    changeLang(lang:string) {
        console.log('lingua da impostare', lang);
        this.translator.setLanguage(lang);
    }
}
