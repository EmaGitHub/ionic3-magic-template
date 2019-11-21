import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/app-store';
import { LoginService } from '@app/login';
import { UserActionTypes } from '@app/core/user/actions/user-actions-types';
import { InfoPage } from '@app/info-tab';
import { Nav } from 'ionic-angular';

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
        private loginService: LoginService
  ) {
  }

  public goInfoPage(){

    this.nav!.setRoot(InfoPage, {}, {animate: true})
  }

  public logOut(){

      this.store.dispatch({type: UserActionTypes.USER_LOGOUT});
      setTimeout(() => {
          this.loginService.openMainLogin(); 
      }, 400);
  }

}