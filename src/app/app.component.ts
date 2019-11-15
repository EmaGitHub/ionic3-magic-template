import { Component } from '@angular/core';
import { Starter } from '@app/starter/starter';
import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { Platform } from 'ionic-angular';
import { AppStore } from './app-store';
import { Store } from '@ngrx/store';
import { LoginService } from './login';
import { UserActionTypes } from './core/user/actions/user-actions-types';

@Component({
    templateUrl: 'app.html'
})
export class App extends AutoUnsubscribe {

    public rootPage: any = Starter;
    public userIsNotLogged: boolean = false;

    constructor(
        private platform: Platform,
        private deviceService: DeviceService,
        private userService: UserService,
        private store: Store<AppStore>,
        private loginService: LoginService
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

    public go(){
    }

    public logOut(){

        setTimeout(() => {
            
            this.deviceService.confirm("Are you sure do you want to exit app?", {title: 'Exit confirm', buttons: [{
                text: 'CANCEL',
                cssClass: 'primary',
                role: 'cancel',
                handler: () => {}
            },{
                text: 'OK',
                cssClass: 'primary',
                handler: () => {
                    this.store.dispatch({type: UserActionTypes.USER_LOGOUT});
                    this.loginService.openMainLogin(); 
                }
            }]})
        }, 300);       
    }
}
