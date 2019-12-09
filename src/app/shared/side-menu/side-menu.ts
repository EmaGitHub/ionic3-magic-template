import { Component, ViewChild, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { UserState } from '@app/core/user/models/user-state';
import { TranslateService } from '@ngx-translate/core';

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
export class SideMenuComponent  {

    @ViewChild(Nav) nav?: Nav;

    private userStateSubscription$: Subscription = new Subscription;
    private ateneo: string = '';

    cityUrlPicture: string = '';
    ateneoLogoUrl: string = '';
    logoStyle: string = '';

    constructor(
        private store: Store<AppStore>,
        private loginService: LoginService,
        private deviceService: DeviceService,
        private splitViewService: SplitViewService,
        private menuCtrl: MenuController,
        private translateService: TranslateService
    ) {

        this.initSidemenuLogo();
        
    }


    initSidemenuLogo(){
        this.userStateSubscription$ = this.store.select('userState').subscribe(
          (userState: UserState) => {
  
              if (userState.logged) {
                  
                this.ateneo = userState.ateneo;
                this.initCityUrlPicture();
                this.initAteneoLogoUrl();
                this.initLogoStyle();
              }
          }
      );
    }

    initAteneoLogoUrl(){
    
        switch (this.ateneo){
    
          case 'Firenze':
              this.ateneoLogoUrl =  "assets/imgs/uni-firenze.png";
              break;
          case 'Siena':
                this.ateneoLogoUrl =  "assets/imgs/uni-siena.png";
                break;
          case 'Stranieri-Siena':
            this.ateneoLogoUrl =  "assets/imgs/unis-siena.png";
            break;
          case 'Pisa':
            this.ateneoLogoUrl =  "assets/imgs/uni-pisa.png";
            break;
        }
      }
    
      initLogoStyle(){
    
        switch (this.ateneo){
    
          case 'Firenze':
              this.logoStyle =  "0 3px";
              break;
          case 'Siena':
                this.logoStyle = "4px 3px";
                break;
          case 'Stranieri-Siena':
                this.logoStyle = "15px 2px";
                break;
          case 'Pisa':
                this.logoStyle = "3px 3px";
                break;
        }
      }

      initCityUrlPicture(){

        switch (this.ateneo){
    
            case 'Firenze':
                this.cityUrlPicture =  "assets/imgs/florence.png";
                break;
            case 'Siena':
                this.cityUrlPicture =  "assets/imgs/siena.png";
                break;
            case 'Stranieri-Siena':
                this.cityUrlPicture =  "assets/imgs/siena.png";
                break;
            case 'Pisa':
                this.cityUrlPicture =  "assets/imgs/pisa.png";
                break;
          }
      }

    public goHomePage() {

        /* this.menuCtrl.toggle()
        setTimeout(() => {
            this.splitViewService.getSplitView(0).pushOnMaster(SeekPage);
        }, 300); */
    }

    public goRootPage() {

        /* this.menuCtrl.toggle()
        setTimeout(() => {
            this.splitViewService.getSplitView(0).pushOnMaster(RootPage);
        }, 300); */
    }

    public goSettingsPage() {

        /* this.menuCtrl.toggle()
        setTimeout(() => {
            this.splitViewService.getSplitView(0).pushOnMaster(SeekPage);
        }, 300); */
    }

    public logOut() {

        setTimeout(() => {

            this.deviceService.confirm(this.translateService.instant('LOGOUT_CONFIRM_LABEL'), {
                title: this.translateService.instant('LOGOUT_CONFIRM_TITLE'), buttons: [{
                    text: this.translateService.instant('CANCEL'),
                    cssClass: 'primary',
                    role: 'cancel',
                    handler: () => { }
                }, {
                    text: 'OK',
                    cssClass: 'primary',
                    handler: () => {
                        this.store.dispatch({ type: UserActionTypes.USER_LOGOUT });
                        this.loginService.openMainLogin();
                    }
                }]
            })
        }, 300);
    }

}
