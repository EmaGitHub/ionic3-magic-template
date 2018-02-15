import { NgModule } from '@angular/core';
import { ApiModule } from '@core/api/api.module';
import { ConfigModule } from '@core/config/config.module';
import { DeviceModule } from '@core/device/device.module';
import { LoggerModule } from '@core/logger/logger.module';
import { ENV } from '@env';

@NgModule({
    imports : [
        ConfigModule.forRoot({
            url: ENV.configUrl
        }),
        ApiModule,
        DeviceModule.forRoot({
            modalTitle : 'Ionic 3 Template'
        }),
        LoggerModule
    ]
})
export class CoreModule {

}
