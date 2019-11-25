import { Component, ViewChild } from '@angular/core';
import { AllTabs } from '@app/tabs';
import { PlaceholderPage, SplitViewService } from '@core/split-view';
import { Nav } from 'ionic-angular';

import { HomePage } from './pages/home/home';

@Component({
    selector: 'home-tab',
    templateUrl: 'home-tab.html'
})
export class HomeTab {
    // Grab References to our 2 NavControllers...
    @ViewChild('masterNav') public masterNav!: Nav;
    @ViewChild('detailNav') public detailNav!: Nav;

    constructor(
        private splitViewService: SplitViewService
    ) { }

    public ionViewDidLoad(): void {
        this.splitViewService.initSplitView(
            AllTabs.HOME,
            {
                nav: this.masterNav,
                page: HomePage
            },
            {
                nav: this.detailNav,
                page: PlaceholderPage,
                params: {
                    icon: 'home',
                    label: 'HOME_PLACEHOLDER'
                }
            }
        );
    }
}
