import { NgModule } from '@angular/core';
import { ApiModule } from '@services/core/api/api.module';
import { ConfigModule } from '@services/core/config/config.module';
import { DeviceModule } from '@services/core/device/device.module';
import { LoggerModule } from '@services/core/logger/logger.module';

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
