import { NgModule } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { ConfigService } from '@services/config/config.service';
import { HttpService } from '@services/http/http.service';
import { LoggerModule } from '@services/logger/logger.module';

/**
 * @name ApiModule
 * @description
 * ApiModule is an ngModule that allows to use all backend API
 * using ConfigService to get api's configuration
 * and HttpService to make the requests
 */
@NgModule({
    imports: [
        LoggerModule
    ],
    providers: [
        ApiService,
        ConfigService,
        HttpService
    ]
})
export class ApiModule {

}
