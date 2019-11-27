import { Component, ViewChild } from '@angular/core';
import { Starter } from '@app/starter/starter';
import { AutoUnsubscribe } from '@core/auto-unsubscribe';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { Platform } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { AppStore } from './app-store';
import { Subscription } from 'rxjs';
import { UserState } from './core/user/models/user-state';

@Component({
    templateUrl: 'app.html'
})
export class App extends AutoUnsubscribe {

    public rootPage: any = Starter;
    public userIsNotLogged: boolean = false;

    private userSubscription$?: Store<UserState>;
    public userLogged: boolean = false;

    constructor(
        private platform: Platform,
        private deviceService: DeviceService,
        private userService: UserService,
        private store: Store<AppStore>
    ) {
        super();
        this.platform.ready().then(() => {
            this.initOrientation();
            this.initLogoutSubscriptions();
            this.initUserSubscription();
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

    public initUserSubscription() {

        this.userSubscription$ = this.store.select('userState');
        this.userSubscription$.subscribe((state: any) => {

            if(state.logged == true) this.userLogged = true;
            else this.userLogged = false;
        })
    }

}
