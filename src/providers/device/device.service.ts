import { Injectable, Optional } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Observable } from 'rxjs/Observable';

import { ConfirmButton } from './ConfirmButton.model';

export class DeviceServiceConfig {
    public modalTitle: string;
}

@Injectable()
export class DeviceService {
    private modalTitle: string = 'MyApp';


    private onlineObservable: Observable<any>;
    private offlineObservable: Observable<any>;
    private ionLoading: Loading;

    constructor(
        @Optional() config: DeviceServiceConfig,
        private platform: Platform,
        private network: Network,
        private splashScreen: SplashScreen,
        private keyboard: Keyboard,
        private spinnerDialog: SpinnerDialog,
        private loadingCtrl: LoadingController,
        private dialogs: Dialogs
    ) {
        if(config){
            if(config.modalTitle) this.modalTitle = config.modalTitle;
        }
        // Create two Observable for online and offline notifications
        // to allow the whole app to subscribe to them with the custom functions
        // getOnlineObservable and getOfflineObservable
        this.onlineObservable = this.network.onConnect();
        this.offlineObservable = this.network.onDisconnect();
    }


    /**
    * Return true if the app running on Cordova, false otherwise
    * @returns boolean
    */
    isCordova(): boolean {
        return this.platform.is('cordova');
    }


    /**
    * Return true if the app running on Android device, false otherwise
    * @returns boolean
    */
    isAndroid(): boolean {
        return this.platform.is('android');
    }


    /**
    * Return true if the app running on iOS device, false otherwise
    * @returns boolean
    */
    isIos(): boolean {
        return this.platform.is('ios');
    }


    /**
    * Return true if the app running on Windows device, false otherwise
    * @returns boolean
    */
    isWindows(): boolean {
        return this.platform.is('windows');
    }


    /**
    * Return true if the device has internet connection available, false otherwise
    * @returns boolean
    */
    isOnline(): boolean {
        if (this.isCordova()) {
            const connectionType = this.network.type
            return connectionType !== (window as any).Connection.UNKNOWN && connectionType !== (window as any).Connection.NONE;
        }
        else {
            return (window.navigator && window.navigator.onLine);
        }
    }


    /**
    * Return true if the device doesn't have internet connection available, false otherwise
    * @returns boolean
    */
    isOffline(): boolean {
        return !this.isOnline();
    }


    /**
    * Return the Observable for online events emitted
    * @returns Observable
    */
    getOnlineObservable(): Observable<any> {
        return this.onlineObservable;
    }


    /**
    * Return the Observable for offline events emitted
    * @returns Observable
    */
    getOfflineObservable(): Observable<any> {
        return this.offlineObservable;
    }


    /**
    * Show the app's splash screen
    * @returns void
    */
    showSplashscreen(): void {
        this.splashScreen.show();
    }


    /**
    * Hide the app's splash screen
    * @returns void
    */
    hideSplashscreen(): void {
        this.splashScreen.hide();
    }

    /**
    * Force keyboard to be shown
    * @returns void
    */
    showKeyboard(): void {
        this.keyboard.show();
    }

    /**
    * Close the keyboard if open
    * @returns void
    */
    closeKeyboard(): void {
        this.keyboard.close();
    }


    /**
    * Show the native spinner dialog
    * or the Ionic Loading if the app is running on browser and there isn't any `message`
    * or the Ionic
    * @param  {string} message Message to display in the spinner dialog
    * @returns void
    */
    showLoading(message: string = ''): void {
        this.closeKeyboard();

        // message = Translator.t(message);

        if (this.isCordova()) {
            this.spinnerDialog.show(this.modalTitle, message, true);
        }
        else if(!this.ionLoading) {
            this.ionLoading = this.loadingCtrl.create({
                content: message
            });
            this.ionLoading.present();
        }
    }


    /**
    * Close the native spinner dialog or the Ionic one
    * @returns void
    */
    hideLoading(): void {
        if (this.isCordova()) {
            this.spinnerDialog.hide();
        }
        else if(this.ionLoading) {
            this.ionLoading.dismiss();
            delete this.ionLoading;
        }
    }


    /**
    * Show a native alert dialog or a simple browser alert
    * @param  {string} message Dialog message
    * @param  {string} title Dialog title
    * @returns void
    */
    alert(message: string, title: string = this.modalTitle): void {
        this.hideLoading();

        let okButton = 'OK';
        // try {
        //     text = Translator.t(text);
        //     title = Translator.t(title);
        //     okButton = Translator.t(okButton);
        // }
        // catch (e) {}

        if (this.isCordova()) {
            this.dialogs.alert(message, title, okButton);
        }
        else {
            window.alert(message);
        }
    }


    /**
    * Show a native confirm dialog or the simple browser confirm
    * @param {string} message Dialog message
    * @param {string} title Dialog title
    * @param {ConfirmButton[]} buttons List of <ConfirmButton>
    */
    confirm(message: string, title: string = this.modalTitle, buttons: ConfirmButton[] = [new ConfirmButton('Ok'), new ConfirmButton('Cancel')]) {
        this.hideLoading();

        // message = Translator.t(message);
        // title = Translator.t(title);
        const buttonLabels = buttons.map((b: ConfirmButton) => {
            // return Translator.t(b.title);
            return b.title;
        });

        if (this.isCordova()) {
            this.dialogs.confirm(message, title, buttonLabels).then(
                (buttonIndex: number) => {
                    // Decrement clicked button index because the plugin use 'one-based indexing'
                    buttonIndex--;
                    // Then execute the 'onClick' function if is defined
                    if (buttons[buttonIndex]) {
                        buttons[buttonIndex].onClick();
                    }
                }
            );
        }
        else {
            if (window.confirm(message)) {
                buttons[0].onClick();
            }
            else {
                buttons[1].onClick();
            }
        }
    }
}
