import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ConfigService } from '@core/config/config.service';
import { LoggerModule } from '@core/logger/logger.module';

import { ApiService } from './api.service';

/**
 * @name ApiModule
 * @description
 * ApiModule is an ngModule that allows to use all backend API
 * using ConfigService to get api's configuration
 * and HttpService to make the requests
 */
@NgModule({
    imports: [
        LoggerModule,
        HttpClientModule
    ],
    providers: [
        ApiService,
        ConfigService
    ]
})
export class ApiModule {

}
