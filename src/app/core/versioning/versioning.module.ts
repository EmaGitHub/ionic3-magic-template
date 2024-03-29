import { NgModule } from '@angular/core';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger';
import { AppVersion } from '@ionic-native/app-version';

import { VersioningService } from './versioning.service';

/**
* @name VersioningModule
* @description
* VersioningModule is an ngModule that imports a service to manage the versioning of the mobile app
*/
@NgModule({
    providers: [
        VersioningService,
        LoggerService,
        DeviceService,
        AppVersion
    ]
})
export class VersioningModule {}
