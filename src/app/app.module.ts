import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app.component';
import { CoreModule } from '@core/core.module';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StartModal } from '@modals/start/start';
import { AboutPage } from '@pages/about/about';
import { ContactPage } from '@pages/contact/contact';
import { HomePage } from '@pages/home/home';
import { TabsPage } from '@pages/tabs/tabs';
import { SharedModule } from '@shared/shared.module';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HomeService } from '../pages/home/home.service';

@NgModule({
    declarations: [
        App,
        StartModal,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App),
        CoreModule,
        SharedModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        StartModal,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HomeService
    ]
})
export class AppModule {}
