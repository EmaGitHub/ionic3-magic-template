import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app.component';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AboutPage } from '@pages/about/about';
import { ContactPage } from '@pages/contact/contact';
import { HomePage } from '@pages/home/home';
import { TabsPage } from '@pages/tabs/tabs';
import { CoreModule } from '@services/core/core.module';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

@NgModule({
    declarations: [
        App,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App),
        CoreModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
