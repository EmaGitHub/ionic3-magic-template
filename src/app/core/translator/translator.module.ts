import { HttpClientModule } from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { TranslatorModuleConfig } from './translator.config';
import { CustomLoader } from './translator.loader';
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
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomLoader,
                deps: [Injector]
            }
        }),
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
