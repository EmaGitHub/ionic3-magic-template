import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { Globalization } from '@ionic-native/globalization';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { I18nModule } from '@shared/i18n/i18n.module';

import { DeviceService } from './device.service';
import { DeviceModuleConfig } from './models';

/**
* @name DeviceModule
* @description
* DeviceModule is an ngModule that imports a lot of services and utils for a Cordova app
*/
@NgModule({
    imports: [
        I18nModule
    ],
    providers: [
        DeviceService,
        Network,
        SplashScreen,
        Keyboard,
        SpinnerDialog,
        Dialogs,
        StatusBar,
        Globalization
    ]
})
export class DeviceModule {
    constructor (@Optional() @SkipSelf() parentModule: DeviceModule) {
        if (parentModule) {
            throw new Error('DeviceModule is already loaded. Import it in the AppModule only');
        }
    }


    /**
    * Allow to pass a <DeviceModuleConfig> configuration to DeviceService
    * @param  {DeviceServiceConfig} config all available configuration for <DeviceModuleConfig>
    * @returns {ModuleWithProviders}
    */
    static forRoot(config?: Partial<DeviceModuleConfig>): ModuleWithProviders {
        return {
            ngModule: DeviceModule,
            providers: [
                { provide: DeviceModuleConfig, useValue: config }
            ]
        }
    }
}
