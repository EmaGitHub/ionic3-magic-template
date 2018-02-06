import { ModuleWithProviders } from '@angular/compiler/src/core';
import { InjectionToken, NgModule } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DeviceConfig } from './device.config';
import { DeviceService } from './device.service';

export const deviceConfigToken = new InjectionToken<DeviceConfig>('deviceConfigToken');

/**
 * @name DeviceModule
 * @description
 * DeviceModule is an ngModule that imports a lot of services and utils for a Cordova app
 */
 @NgModule({
    providers: [
        Network,
        SplashScreen,
        Keyboard,
        SpinnerDialog,
        DeviceService
    ]
})
export class DeviceModule {
    /**
     * Allow to pass a <DeviceConfig> configuration con DeviceModule
     * @param  {Partial<DeviceConfig>} config all available configuration for <DeviceConfig>
     * @returns ModuleWithProviders
     */
    static forRoot(config?: Partial<DeviceConfig>): ModuleWithProviders {
        return {
            ngModule: DeviceModule,
            providers: [
                { provide: deviceConfigToken, useValue: config},
                {
                    provide: DeviceConfig,
                    useFactory: (config: DeviceConfig) => {
                        return new DeviceConfig(config);
                    },
                    deps: [deviceConfigToken]
                }
            ]
        }
    }
}
