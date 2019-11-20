import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigService } from '@core/config/config.service';

import { ApiService } from './api.service';
import { HttpClientProvider } from './httpClient.service';
import { HttpNativeProvider } from './httpNative.service';
import { FakeBackend } from './models/fake-backend';
import { EffectsModule } from '@ngrx/effects';
import { ApiEffects } from './effects/api-effects';

/**
 * @name ApiModule
 * @description
 * ApiModule is an ngModule that allows to use all backend API
 * using ConfigService to get api's configuration
 * and HttpService to make the requests
 */
@NgModule({
    imports: [
        HttpClientModule,
/*         EffectsModule.forFeature([ApiEffects])*/   
    ],
    providers: [
        ApiService,
        ConfigService,
        HttpClientProvider,
        HttpNativeProvider,
        FakeBackend
    ]
})
export class ApiModule {

}
