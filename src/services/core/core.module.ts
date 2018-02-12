import { NgModule } from '@angular/core';
import { ENV } from '@env';
import { ConfigModule } from '@services/config/config.module';
import { DeviceModule } from '@services/device/device.module';
import { LoggerModule } from '@services/logger/logger.module';

@NgModule({
    imports : [
        ConfigModule.forRoot({
            url: ENV.configUrl
        }),
        // ApiModule,
        DeviceModule.forRoot({
            modalTitle : 'Ionic 3 Template'
        }),
        LoggerModule
    ]
})
export class CoreModule {

}
