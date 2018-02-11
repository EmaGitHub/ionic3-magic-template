import { NgModule } from '@angular/core';
import { ApiModule } from '@services/api/api.module';
import { ConfigModule } from '@services/config/config.module';
import { DeviceModule } from '@services/device/device.module';
import { LoggerModule } from '@services/logger/logger.module';

@NgModule({
    imports : [
        ConfigModule,
        ApiModule,
        DeviceModule.forRoot({
            modalTitle : 'Ionic 3 Template'
        }),
        LoggerModule
    ]
})
export class CoreModule {

}
