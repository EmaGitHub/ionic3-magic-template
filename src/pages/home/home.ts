import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DeviceService } from '../../providers/device/device.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public deviceService: DeviceService
    ) {

    }

    test() {
        this.deviceService.showLoading();

        setTimeout(() => {
            this.deviceService.hideLoading();
        }, 2000);
    }

}
