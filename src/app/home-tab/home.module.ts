import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { HomeTab } from './home-tab';
import { HomePage } from './pages/home/home';

@NgModule({
    declarations: [
        // Tab with split view
        HomeTab,

        // Components

        // Pages list
        HomePage
    ],
    imports: [
        IonicModule,
        SharedModule
    ],
    entryComponents: [
        // Tab with split view
        HomeTab,

        // Components

        // Pages list
        HomePage
    ]
})
export class HomeModule { }
