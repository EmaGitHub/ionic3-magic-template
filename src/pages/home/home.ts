import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import { ApiService } from '../../services/core/api/api.service';

// import { DeviceService } from '@services/core';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        // public http: ApiService
        // public deviceService: DeviceService,
        // public loggerService: LoggerService
    ) {

    }

    test() {
        // this.loggerService.error('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.warn('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.info('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        // this.loggerService.debug('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});

        // this.deviceService.showLoading();

        // setTimeout(() => {
        //     this.deviceService.alert('ciao');
        // }, 1000);

        // this.getQualcosaDaServizio()
        //     .subscribe(data => {
        //         console.log(data);
        //     });
    }

    // START SERVIZIO

    // getQualcosaDaServizio(){
    //     // preparo la richiesta tramite il config service
    //     // integro la richiesta con i dati (params e/o body)
    //     // chiamo l'api service e faccio la request


    //     return this.http.request()


    //     get<Config>(
    //         this.configUrl, { observe: 'response' });
    // }

    // END SERVIZIO
}
