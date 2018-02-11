import { NgModule } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { ConfigService } from '@services/config/config.service';

@NgModule({
    providers: [
        ApiService,
        ConfigService
    ]
})
export class ApiModule {

}
