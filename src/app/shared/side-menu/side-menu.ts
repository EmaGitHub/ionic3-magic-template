import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/app-store';
import { LoginService } from '@app/login';
import { UserActionTypes } from '@app/core/user/actions/user-actions-types';
import { InfoPage } from '@app/info-tab';
import { Nav, MenuController } from 'ionic-angular';
import { DeviceService } from '@app/core/device';
import { SplitViewService } from '@app/core/split-view';
import { RootPage } from '@app/home-tab/pages/root/root';
import { SeekPage } from '@app/home-tab/pages/seek/seek';
import { Starter } from '@app/starter/starter';

/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {

  @ViewChild(Nav) nav?: Nav;

  constructor(
        private store: Store<AppStore>,
        private loginService: LoginService,
        private deviceService: DeviceService,
        private splitViewService: SplitViewService,
        private menuCtrl: MenuController,
  ) {
  }

  public goHomePage(){

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
