import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceService } from '../../providers/device/device.service';
import { LoggerService } from '../../providers/logger/logger.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public deviceService: DeviceService,
        public loggerService: LoggerService
    ) {

    }

    test() {
        this.loggerService.error('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        this.loggerService.warn('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        this.loggerService.info('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});
        this.loggerService.debug('ciao', 1, 2, false, [10, true, 'ciao'], {a: 123, b: 'ciaone', c: this.loggerService});

        this.deviceService.showLoading();

        setTimeout(() => {
            this.deviceService.alert('ciao');
        }, 1000);
    }

}
