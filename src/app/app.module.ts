import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { StartModal } from '@modals/start/start';
import { AboutPage } from '@pages/about/about';
import { ContactPage } from '@pages/contact/contact';
import { TabsPage } from '@pages/tabs/tabs';
import { SharedModule } from '@shared/shared.module';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Tab1Module } from './tab1/tab1.module';

@NgModule({
    declarations: [
        App,
        StartModal,
        AboutPage,
        ContactPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App),
        CoreModule,
        SharedModule,
        Tab1Module
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        StartModal,
        AboutPage,
        ContactPage,
        TabsPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
