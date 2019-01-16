import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SplitView } from './models/SplitView';
import { SplitViewConfig } from './models/SplitViewConfig';

@Injectable()
export class SplitViewService {
    private isOn: boolean = false;
    private splitViewList: SplitView[] = [];
    private visibileSplitViewIndex: number = 0;
    public isOn$: Subject<boolean> = new Subject<boolean>();

    constructor(

    ){ }

    initSplitView(index: number, masterView: SplitViewConfig, detailView: SplitViewConfig) {
        if(typeof index !== undefined && !this.splitViewList[index]){
            this.splitViewList[index] = new SplitView(masterView.nav, detailView.nav, this.isOn, this.isOn$);
            this.splitViewList[index].initMaster(masterView.page, masterView.params);
            this.splitViewList[index].initDetail(detailView.page, detailView.params);
        }
        return this.splitViewList[index];
    }

    getSplitView(index: number): SplitView {
        return this.splitViewList[index];
    }

    isActive(): boolean {
        return this.isOn;
    }

    setVisibleSplitView(index: number): void {
        if(typeof index !== undefined && this.splitViewList[index]){
            this.visibileSplitViewIndex = index;
        }
    }

    back(){
        this.splitViewList[this.visibileSplitViewIndex].back();
    }

    onSplitPaneChanged(isOn: boolean) {
        this.isOn = isOn;
        this.isOn$.next(this.isOn);
    }

    activateSplitView(){
        this.onSplitPaneChanged(true);
    }

    deactivateSplitView(){
        this.onSplitPaneChanged(false);
    }

}
