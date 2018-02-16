import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

import { TranslatorModuleConfig } from './translator.config';
import { TranslatorService } from './translator.service';

/**
* @name TranslatorModule
* @description
* TranslatorModule is an ngModule that imports a service to manage the external JSON language file
* and initialize the ngx-translate library
*/
@NgModule({
    imports: [
        IonicStorageModule.forRoot(),
        HttpClientModule
    ],
    providers: [
        TranslatorService
    ]
})
export class TranslatorModule {
    constructor (@Optional() @SkipSelf() parentModule: TranslatorModule) {
        if (parentModule) {
            throw new Error('TranslatorModule is already loaded');
        }
    }


    /**
    * Allow to pass a <TranslatorModuleConfig> configuration to services in TranslatorModule
    * @param  {TranslatorModuleConfig} config all available configuration for <TranslatorModule>
    * @returns {ModuleWithProviders}
    */
    static forRoot(config: TranslatorModuleConfig): ModuleWithProviders {
        return {
            ngModule: TranslatorModule,
            providers: [
                { provide: TranslatorModuleConfig, useValue: config }
            ]
        }
    }
}
