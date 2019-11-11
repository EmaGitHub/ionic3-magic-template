import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { InfoPage } from './pages/info/info';
import { InfoTab } from './info-tab';

@NgModule({
    declarations: [
        // Tab with split view
        InfoTab,

        // Components

        // Pages list
        InfoPage
    ],
    imports: [
        IonicModule,
        SharedModule
    ],
    entryComponents: [
        // Tab with split view
        InfoTab,

        // Components

        // Pages list
        InfoPage
    ]
})
export class InfoModule { }
