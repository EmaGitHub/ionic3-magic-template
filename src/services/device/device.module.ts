import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DeviceServiceConfig } from './device.config';
import { DeviceService } from './device.service';

/**
* @name DeviceModule
* @description
* DeviceModule is an ngModule that imports a lot of services and utils for a Cordova app
*/
@NgModule({
    providers: [
        DeviceService,
        Network,
        SplashScreen,
        Keyboard,
        SpinnerDialog,
        Dialogs,
        StatusBar
    ]
})
export class DeviceModule {
    constructor (@Optional() @SkipSelf() parentModule: DeviceModule) {
        if (parentModule) {
            throw new Error('DeviceModule is already loaded. Import it in the AppModule only');
        }
    }


    /**
    * Allow to pass a <DeviceServiceConfig> configuration to DeviceService
    * @param  {DeviceServiceConfig} config all available configuration for <DeviceServiceConfig>
    * @returns {ModuleWithProviders}
    */
    static forRoot(config?: Partial<DeviceServiceConfig>): ModuleWithProviders {
        return {
            ngModule: DeviceModule,
            providers: [
                { provide: DeviceServiceConfig, useValue: config }
            ]
        }
    }
}
