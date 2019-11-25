import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { PlaceholderPage } from '@core/split-view/placeholder/placeholder';
import { ENV } from '@env';
import { Nav, NavOptions } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

export class SplitView extends AutoUnsubscribe {

    constructor(
        private masterNav: Nav,
        private detailNav: Nav,
        private isOn: boolean,
        // tslint:disable-next-line
        private isOn$: Subject<boolean>
    ) {
        super();
        const SplitView = this;
        isOn$
            .takeUntil(this.destroy$)
            .subscribe((isOn: boolean) => {
                SplitView.isOn = isOn;
                // if the nav controllers have been instantiated...
                if (SplitView.masterNav && SplitView.detailNav) {
                    if (SplitView.isOn) {
                        SplitView.activateSplitView();
                    }
                    else {
                        SplitView.deactivateSplitView();
                    }
                }
            });
    }

    /**
     * Force first page of master view
     * @param  {any} page
     */
    public initMaster(page: any, params: {title?: string; icon?: string; label?: string} = {}): Promise<any> {
        return this.masterNav.setRoot(page, params);
    }
    public pushOnMaster(page: any, params: any = {}, options: Partial<NavOptions>|undefined = {}): Promise<any> {
        return this.masterNav.push(page, params, options);
    }

    /**
     * * Force first page of detail view
     * @param  {any} page
     */
    public initDetail(page: any, params: {title?: string; icon?: string; label?: string} = {}): Promise<any> {
        if (!params.title) {
            params.title = ENV.appName;
        }
        return this.detailNav.setRoot(page, params);
    }
    /**
     * If the split view if active set the root of detail nav
     * otherwise make a simple push on the master nav
     * @param  {any} page
     * @param  {any={}} params
     * @param  {Partial<NavOptions>|undefined={}} options
     */
    public setRootOnDetail(page: any, params: any = {}, options: Partial<NavOptions>|undefined = {}): Promise<any> {
        if (this.isOn) {
            return this.detailNav.setRoot(page, params, options);
        }
        else {
            return this.pushOnMaster(page, params, options);
        }
    }
    /**
     * Make a simple push on the master nav,
     * or the detail nav if the split view is active
     * @param  {any} page
     * @param  {any={}} params
     * @param  {Partial<NavOptions>|undefined={}} options
     */
    public pushOnDetail(page: any, params: any = {}, options: Partial<NavOptions>|undefined = {}): Promise<any> {
        if (this.isOn) {
            return this.detailNav.push(page, params, options);
        }
        else {
            return this.pushOnMaster(page, params, options);
        }
    }

    public gotoFirstDetailPage(options: Partial<NavOptions>|undefined = {}): Promise<any> {
        if (this.isOn) {
            return this.detailNav.popToRoot(options);
        }
        else {
            return this.masterNav.popToRoot(options);
        }
    }

    public back(): Promise<any> {
        if (this.isOn) {
            if (this.detailNav.canGoBack()) {
                return this.detailNav.pop();
            }
        }
        else {
            if (this.masterNav.canGoBack()) {
                return this.masterNav.pop();
            }
        }
        return Promise.resolve();
    }

    public activateSplitView(): void {
        this.masterNav.getActive();
        // let currentView = this.masterNav.getActive();
        // if the current view is a 'Detail' page...
        // if (currentView.component.prototype instanceof DetailPage) {
        //     // - remove it from the 'master' nav stack...
        //     this.masterNav.pop();
        //     // - and add it to the 'detail' nav stack...
        //     this.detailNav.setRoot(currentView.component, currentView.data);
        // }
    }

    public deactivateSplitView(): void {
        this.detailNav.getActive();
        // let detailView = this.detailNav.getActive();
        this.detailNav.setRoot(PlaceholderPage);
        // if (detailView.component.prototype instanceof DetailPage) {
        //     // if the current detail view is a 'Detail' page...
        //     // ...so, not the placeholder page:
        //     let index = this.masterNav.getViews().length;
        //     // add it to the master view...
        //     this.masterNav.insert(index, detailView.component, detailView.data);
        // }
    }
}
