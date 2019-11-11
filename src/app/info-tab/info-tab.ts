import { Component, ViewChild } from '@angular/core';
import { AllTabs } from '@app/tabs';
import { PlaceholderPage, SplitViewService } from '@core/split-view';
import { Nav } from 'ionic-angular';

import { InfoPage } from './pages/info/info';

@Component({
    selector: 'info-tab',
    templateUrl: 'info-tab.html'
})
export class InfoTab {
    // Grab References to our 2 NavControllers...
    @ViewChild('masterNav') public masterNav!: Nav;
    @ViewChild('detailNav') public detailNav!: Nav;

    constructor(
        private splitViewService: SplitViewService
    ) { }

    public ionViewDidLoad(): void {
        this.splitViewService.initSplitView(
            AllTabs.INFO,
            {
                nav: this.masterNav,
                page: InfoPage
            },
            {
                nav: this.detailNav,
                page: PlaceholderPage,
                params: {
                    icon: 'map',
                    label: 'INFO_PLACEHOLDER'
                }
            }
        );
    }
}
