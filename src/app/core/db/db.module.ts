import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { DBService } from './db.service';
import { DBModuleOptions } from './models/DBModuleOptions';

/**
* @name DBModule
* @description
* DBModule is an ngModule that imports a service to manage the local internal database
*/
@NgModule({
    providers: [
        DBService
    ]
})
export class DBModule {
    constructor(@Optional() @SkipSelf() parentModule: DBModule) {
        if (parentModule) {
            throw new Error('DBModule is already loaded');
        }
    }

    /**
    * Allow to pass a <DBModuleOptions> configuration to services in DBModule
    * @param  {DBModuleOptions} options all available configuration for <DBModule>
    * @returns {ModuleWithProviders}
    */
    public static forRoot(options: DBModuleOptions): ModuleWithProviders {
        return {
            ngModule: DBModule,
            providers: [
                { provide: DBModuleOptions, useValue: options }
            ]
        }
    }
}
