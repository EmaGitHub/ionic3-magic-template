import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';

import { HomePage } from './home/home';
import { HomeService } from './home/home.service';

@NgModule({
    imports: [
        BrowserModule,
        IonicModule,
        SharedModule
    ],
    declarations: [
        HomePage
    ],
    entryComponents : [
        HomePage
    ],
    providers: [
        HomeService
    ]
})
export class Tab1Module { }
