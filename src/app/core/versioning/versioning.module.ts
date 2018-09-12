import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger';
import { AppVersion } from '@ionic-native/app-version';

import { VersioningOptions } from './models/VersioningOptions';
import { VersioningService } from './versioning.service';

/**
* @name VersioningModule
* @description
* VersioningModule is an ngModule that imports a service to manage the versioning of the mobile app
*/
@NgModule({
    providers: [
        VersioningService,
        LoggerService,
        DeviceService,
        AppVersion
    ]
})
export class VersioningModule {
    constructor (@Optional() @SkipSelf() parentModule: VersioningModule) {
        if (parentModule) {
            throw new Error('VersioningModule is already loaded');
        }
    }


    /**
    * Allow to pass a <VersioningOptions> options to services in VersioningModule
    * @param  {VersioningOptions} options all available options for <VersioningModule>
    * @returns {ModuleWithProviders}
    */
    static forRoot(options?: VersioningModule): ModuleWithProviders {
        return {
            ngModule: VersioningModule,
            providers: [
                { provide: VersioningOptions, useValue: options }
            ]
        }
    }
}
