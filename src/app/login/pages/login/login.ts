import { Component, ViewChild, ContentChild } from '@angular/core';
import { TabsService } from '@app/tabs';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger';
import { UserService } from '@core/user';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ViewController, TextInput, Slides } from 'ionic-angular';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/app-store';
import { UserState } from '@app/core/user/models/user-state';
import { LoginAction } from '@app/core/user/actions/login-action';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private username: string = '';
    private password: string = '';
    private userStateSubscription$: Subscription = new Subscription;
    show = false;

    @ContentChild(TextInput) ion_input?: TextInput;
    @ViewChild('slides') slides?: Slides;

    public tags: string [] = ['DarkOrchid','DarkOliveGreen ','DeepSkyBlue','DarkTurquoise','DarkOrange','FireBrick','Gray','LawnGreen','LightSalmon','MidnightBlue',
    'Violet','CornflowerBlue','Red','SlateBlue','Tomato','DarkOrchid'];

    constructor(
        private logger: LoggerService,
        private userService: UserService,
        private deviceService: DeviceService,
        private tabsService: TabsService,
        private viewCtrl: ViewController,
        private inAppBrowser: InAppBrowser,
        private store: Store<AppStore>    
        ) { }

    ionViewDidEnter() {

        this.userStateSubscription$ = this.store.select('userState').subscribe(
            (userState: UserState) => {

                if (userState.error) {
                    this.deviceService.hideLoading();
                    this.deviceService.alert("Login error");
                }

                if (userState.logged) {
                    this.closeModal()
                    this.deviceService.hideLoading();
                    this.userService.setFirstAccess();
                    this.tabsService.loadTabsPage();
                }
            }
        );
    }

    toggleShow()
  {
    this.show = !this.show;
    if (this.show){
        this.ion_input!.type("text");
    }
    else {
        this.ion_input!.type("password");
    }
  }

    ionViewDidLeave() {

        this.userStateSubscription$!.unsubscribe();
    }

    public barcodeScan(){
        console.log("barcode Scan")
    }

    public onLoginSubmit() {

        this.logger.debug(`credentials ${this.username}/${this.password}`);
        this.deviceService.showLoading();
        this.store.dispatch(new LoginAction(this.username, this.password));
    }

    public onForgotPasswordClicked(): void {
        this.inAppBrowser.create('https://forgotpassword.test.com', '_system');
    }

    public next() {
        this.slides!.slideNext();
      }

    public closeModal(): void {
        this.viewCtrl.dismiss();
    }
}
