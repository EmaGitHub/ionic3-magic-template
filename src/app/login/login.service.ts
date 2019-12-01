import { Injectable } from '@angular/core';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { Modal, ModalController } from 'ionic-angular';
import { WelcomeScreen } from './pages/welcome-screen/welcome-screen';
import { LoginPage } from './pages/login/login';

@Injectable()
export class LoginService {

    private _loginModal: Modal;
    private _welcomeModal: Modal;

    constructor(
        private modalCtrl: ModalController,
        private deviceService: DeviceService,
        private userService: UserService
    ) {
        // Create the main welcome modal
        this._welcomeModal = this.modalCtrl.create(WelcomeScreen, {}, {
            showBackdrop: true,
            enableBackdropDismiss: false,
            cssClass: 'welcome-modal'
        });

        this._welcomeModal.onDidDismiss(data => {
            this.openMainLogin();
          });

        // Create the main login modal
        this._loginModal = this.modalCtrl.create(LoginPage, {}, {
            showBackdrop: true,
            enableBackdropDismiss: false,
            cssClass: 'login-modal'
        });
        this.initMainLoginModalObservable();
    }

    /**
     * Open the previuosly created main login modal
     */
    public openMainLogin(): void {
        this._loginModal.present().then(() => {
            this.deviceService.hideLoading();
        });
    }

    /**
     * Open the previuosly created main login modal
     */
    public openWelcomeScreen(): void {
        this._welcomeModal.present().then(() => {
            this.deviceService.hideLoading();
        });
    }

    /**
     * Start to observe the session's changes in order to open or dismiss it
     */
    private initMainLoginModalObservable(): void {
        // Listen the session's changes in order to open or dismiss the main login modal
        this.userService.onSessionChanges$.subscribe((loginState: number) => {
            // If the refreshToken expires, the user will be thrown out
            // and the login modal will be presented
            if (loginState === LoginStates.THROW_OUT) {
                this._loginModal.present();
            }
            // If the user logs in dismiss the login modal
            else if (loginState === LoginStates.NEW_USER ||
                    loginState === LoginStates.LAST_USER ||
                    loginState === LoginStates.PUBLIC) {

                this._loginModal.dismiss();
            }
        });
    }
}
