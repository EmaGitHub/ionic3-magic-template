import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { ApiService } from './api.service';
import { FakeBackend } from './models/fake-backend';

import { HttpClientProvider } from './clients/httpClient.service';
import { HttpNativeClientProvider } from './clients/httpNativeClient.service';

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
        HttpNativeClientProvider,
        FakeBackend
    ]
})
export class ApiModule {

}
