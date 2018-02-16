import { Component } from '@angular/core';
import { HomeService } from '@pages/home/home.service';
import { NavController } from 'ionic-angular';

// import { ConfigService } from '@core/config/config.service';
// import { ApiService } from '@core/api/api.service';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        // public http: ApiService,
        // public config: ConfigService,
        public homeService: HomeService
        // public deviceService: DeviceService,
        // public loggerService: LoggerService
    ) {

        // this.config.update();

    }

    test() {
        // this.loggerService.error('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.warn('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.info('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.debug('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});

        // this.deviceService.showLoading();

        this.homeService.recuperaRoba();
    }
}
