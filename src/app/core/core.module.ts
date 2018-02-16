import { NgModule } from '@angular/core';
import { ApiModule } from '@core/api/api.module';
import { ConfigModule } from '@core/config/config.module';
import { DeviceModule } from '@core/device/device.module';
import { I18nModule } from '@core/i18n/i18n.module';
import { LoggerModule } from '@core/logger/logger.module';
import { ENV } from '@env';

@NgModule({
    imports : [
        ConfigModule.forRoot({
            url: ENV.configUrl,
            storePrefix: ENV.appName.replace(/ /g, '')
        }),
        I18nModule.forRoot({
            url: ENV.translationsUrl,
            storePrefix: ENV.appName.replace(/ /g, '')
        }),
        ApiModule,
        DeviceModule.forRoot({
            modalTitle : ENV.appName
        }),
        LoggerModule
    ]
})
export class CoreModule {

}
