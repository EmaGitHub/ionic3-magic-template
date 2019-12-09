import { Component, OnInit } from '@angular/core';
import { AppStore } from '@app/app-store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserState } from '@app/core/user/models/user-state';

/**
 * Generated class for the RtLogoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'rt-logo',
  templateUrl: 'rt-logo.html'
})
export class RtLogoComponent {

  private userStateSubscription$: Subscription = new Subscription;
  private ateneo: string = '';

  ateneoLogoUrl: string = '';
  logoStyle: string= '';

  constructor( 
    private store: Store<AppStore>
  ) {

    this.initNavbarLogo();
  }

  initNavbarLogo(){
      this.userStateSubscription$ = this.store.select('userState').subscribe(
        (userState: UserState) => {

            if (userState.logged) {
                
              this.ateneo = userState.ateneo;
              this.initAteneoLogo();
              this.initLogoStyle();
            }
        }
    );
  }

  initAteneoLogo(){
    
    switch (this.ateneo){

      case 'Firenze':
          this.ateneoLogoUrl= "assets/imgs/uni-firenze.png";
          break;
      case 'Siena':
          this.ateneoLogoUrl=  "assets/imgs/uni-siena.png";
          break;
      case 'Stranieri-Siena':
          this.ateneoLogoUrl=  "assets/imgs/unis-siena.png";
          break;
      case 'Pisa':
          this.ateneoLogoUrl=  "assets/imgs/uni-pisa.png";
          break;
    }
  }

  initLogoStyle(){

    switch (this.ateneo){

      case 'Firenze':
          this.logoStyle= "50px";
          break;
      case 'Siena':
          this.logoStyle= "55px";
          break;
      case 'Stranieri-Siena':
          this.logoStyle= "70px";
          break;
      case 'Pisa':
          this.logoStyle= "53px";
          break;
    }
  }

}
