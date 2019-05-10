import { Component, ViewChild } from '@angular/core';
import { HomeTab } from '@app/home-tab';
import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { DeviceService } from '@core/device';
import { SplitViewService } from '@core/split-view';
import { Tab, Tabs } from 'ionic-angular';

import { TabsService } from './tabs.service';

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage extends AutoUnsubscribe {
    @ViewChild('appTabs') public appTabs!: Tabs;
    public tab1Root = HomeTab;
    // tab2Root = FloorPlansTab;
    // tab3Root = InfoCornerTab;
    // tab4Root = NotificationsTab;
    public splitViewIsActive: boolean = false;
    public pushCounterBadge: number = 0;

    constructor(
        private splitViewService: SplitViewService,
        private deviceService: DeviceService,
        private tabsService: TabsService
    ) {
        super();
    }

    public ionViewDidLoad(): void {
        this._initSplitViewSubscriptions();
    }

    private _initSplitViewSubscriptions(): void {
        const Tabs = this;
        // If device is tablet activate split view and unlock orientation
        if (this.deviceService.isTablet()) {
            this.splitViewIsActive = true;
            this.splitViewService.isOn$
                .takeUntil(this.destroy$)
                .subscribe((isActive: boolean) => {
                    Tabs.splitViewIsActive = isActive;
                });
            this.splitViewService.activateSplitView();
        }
        // Otherwise deactivate split view and lock orientation in portrait
        else {
            this.splitViewIsActive = false;
            this.splitViewService.deactivateSplitView();
        }
    }

    public onTabChanges(activeTab: Tab): void {
        this.tabsService.onTabChanges$.next(activeTab.index);
    }

}
