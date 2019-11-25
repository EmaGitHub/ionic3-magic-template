import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the WelcomeScreenComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'welcome-screen',
  templateUrl: 'welcome-screen.html'
})
export class WelcomeScreen {

  constructor(private viewCrel: ViewController) {}

  goLogin(){this.viewCrel.dismiss();}

}
