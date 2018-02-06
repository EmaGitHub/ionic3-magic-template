import { NgModule } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DeviceService } from './device.service';

@NgModule({
    providers: [
        Network,
        SplashScreen,
        Keyboard,
        SpinnerDialog,
        DeviceService
    ]
})
export class DeviceModule {}
