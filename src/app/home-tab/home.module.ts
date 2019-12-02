import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeTab } from './home-tab';
import { HomePage } from './pages/home/home';
import { RootPage } from './pages/root/root';
import { SeekPage } from './pages/seek/seek';
import { HomeBannerComponent } from './components/home-banner/home-banner';
import { MainEventComponent } from './components/main-event/main-event';
import { HorizontalScrollEventsComponent } from './components/horizontal-scroll-events/horizontal-scroll-events';
import { ScrollEventComponent } from './components/scroll-event/scroll-event';
import { MainEventsComponent } from './components/main-events/main-events';
import { EventDetailPage } from './pages/event-detail/event-detail';

@NgModule({
    declarations: [
        // Tab with split view
        HomeTab,
        
        // Components
        HomeBannerComponent,
        MainEventsComponent,
        MainEventComponent,
        HorizontalScrollEventsComponent,
        ScrollEventComponent,

        // Pages list
        HomePage,
        EventDetailPage,
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
        HomeBannerComponent,
        MainEventsComponent,
        MainEventComponent,
        HorizontalScrollEventsComponent,
        ScrollEventComponent,

        // Pages list
        HomePage,
        EventDetailPage,
        RootPage,
        SeekPage
    ]
})
export class HomeModule { }
