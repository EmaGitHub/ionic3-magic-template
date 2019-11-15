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
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './core/user/effects/user.effects';
import { UserReducer } from './core/user/reducers/user.reducer';
import { DeviceReducer } from './core/device/reducers/device.reducer';
import { SideMenuComponent } from './shared/side-menu/side-menu';

@NgModule({
    declarations: [
        App,
        Starter,
        SideMenuComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(App, IonicConfig),
        StoreModule.forRoot(<any>{userState: UserReducer, deviceState: DeviceReducer}),
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
        Starter,
        SideMenuComponent
    ],
    providers: [
        Store,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
