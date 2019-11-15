import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeTab } from './home-tab';
import { HomePage } from './pages/home/home';
import { DetailPage } from './pages/detail/detail';
import { RootPage } from './pages/root/root';
import { SeekPage } from './pages/seek/seek';

@NgModule({
    declarations: [
        // Tab with split view
        HomeTab,
        

        // Components

        // Pages list
        HomePage,
        DetailPage,
        RootPage,
        SeekPage
    ],
    imports: [
        IonicModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    entryComponents: [
        // Tab with split view
        HomeTab,

        // Components

        // Pages list
        HomePage,
        DetailPage,
        RootPage,
        SeekPage
    ]
})
export class HomeModule { }
