import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from '@app/app.component';
import { HomeModule } from '@app/home-tab';
import { IonicConfig } from '@app/ionic.config';
import { LoginModule } from '@app/login/login.module';
import { Starter } from '@app/starter/starter';
import { TabsModule } from '@app/tabs/tabs.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InfoModule } from './info-tab';
import { StoreModule, Store } from '@ngrx/store';
import { userReducer } from './core/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './core/user/user.effects';

@NgModule({
    declarations: [
        App,
        Starter
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App, IonicConfig),
        StoreModule.forRoot(<any>{userState: userReducer}),
        EffectsModule.forRoot([UserEffects]),
        CoreModule,
        SharedModule,
        LoginModule,
        TabsModule,
        HomeModule,
        InfoModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        App,
        Starter
    ],
    providers: [
        Store,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
