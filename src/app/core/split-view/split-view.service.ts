import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SplitView } from './models/SplitView';
import { ISplitViewConfig } from './models/SplitViewConfig';

@Injectable()
export class SplitViewService {
    private isOn: boolean = false;
    private splitViewList: SplitView[] = [];
    private visibileSplitViewIndex: number = 0;
    public isOn$: Subject<boolean> = new Subject<boolean>();

    constructor(

    ) { }

    public initSplitView(index: number, masterView: ISplitViewConfig, detailView: ISplitViewConfig): SplitView {
        if (typeof index !== undefined && !this.splitViewList[index]) {
            this.splitViewList[index] = new SplitView(masterView.nav, detailView.nav, this.isOn, this.isOn$);
            this.splitViewList[index].initMaster(masterView.page, masterView.params);
            this.splitViewList[index].initDetail(detailView.page, detailView.params);
        }
        return this.splitViewList[index];
    }

    public getSplitView(index: number): SplitView {
        return this.splitViewList[index];
    }

    public isActive(): boolean {
        return this.isOn;
    }

    public setVisibleSplitView(index: number): void {
        if (typeof index !== undefined && this.splitViewList[index]) {
            this.visibileSplitViewIndex = index;
        }
    }

    public back(): void {
        this.splitViewList[this.visibileSplitViewIndex].back();
    }

    public onSplitPaneChanged(isOn: boolean): void {
        this.isOn = isOn;
        this.isOn$.next(this.isOn);
    }

    public activateSplitView(): void {
        this.onSplitPaneChanged(true);
    }

    public deactivateSplitView(): void {
        this.onSplitPaneChanged(false);
    }

}
