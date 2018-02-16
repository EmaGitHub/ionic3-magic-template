import { NgModule } from '@angular/core';
import { ENV } from '@env';
import { I18nModule } from '@shared/i18n/i18n.module';

@NgModule({
    imports : [
        I18nModule.forRoot({
            url: ENV.translationsUrl,
            storePrefix: ENV.appName.replace(/ /g, '')
        })
    ],
    exports : [
        I18nModule
    ]
})
export class SharedModule { }
