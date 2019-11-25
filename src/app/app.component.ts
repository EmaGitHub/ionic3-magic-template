import { Component, ViewChild } from '@angular/core';
import { Starter } from '@app/starter/starter';
import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { AppStore } from './app-store';
import { Store } from '@ngrx/store';
import { LoginService } from './login';
import { UserActionTypes } from './core/user/actions/user-actions-types';
import { SplitViewService } from './core/split-view';
import { RootPage } from './home-tab/pages/root/root';
import { SeekPage } from './home-tab/pages/seek/seek';

@Component({
    templateUrl: 'app.html'
})
export class App extends AutoUnsubscribe {

    @ViewChild(Nav) nav?: Nav;

    public rootPage: any = Starter;
    public userIsNotLogged: boolean = false;

    constructor(
        private platform: Platform,
        private deviceService: DeviceService,
        private userService: UserService,
        private store: Store<AppStore>,
        private loginService: LoginService,
        private menuCtrl: MenuController,
        private splitViewService: SplitViewService
    ) {
        super();
        this.platform.ready().then(() => {
            this.initOrientation();
            this.initLogoutSubscriptions();
        });
    }

    /**
     * Initialize the native device orientation
     */
    public initOrientation(): void {
        // If device is tablet activate split view and unlock orientation
        if (this.deviceService.isTablet()) {
            if (this.deviceService.isCordova()) {
                this.deviceService.unlockOrientation();
            }
        }
        // Otherwise deactivate split view and lock orientation in portrait
        else if (this.deviceService.isCordova()) {
            this.deviceService.lockOrientation(this.deviceService.ORIENTATIONS.PORTRAIT_PRIMARY);
        }
    }

    /**
     * Initialize subscription for logout events in order to hide the app's content
     */
    public initLogoutSubscriptions(): void {
        this.userService.onSessionChanges$
            .takeUntil(this.destroy$)
            .subscribe((loginState: number) => {
                this.userIsNotLogged = (loginState === LoginStates.LOGOUT || loginState === LoginStates.THROW_OUT);
            });
    }

    public goHomePage(){
        
        console.log("splitview 0: ",this.splitViewService.getSplitView(0));
        console.log("splitview 1: ",this.splitViewService.getSplitView(1));

        this.menuCtrl.toggle()
        setTimeout(() => {
            this.splitViewService.getSplitView(0).pushOnMaster(SeekPage);
        }, 300);
    }

    public goRootPage(){

        this.menuCtrl.toggle()
        setTimeout(() => {
            this.splitViewService.getSplitView(0).pushOnMaster(RootPage);
        }, 300);
    }
}
