import { Injectable, Optional } from '@angular/core';
import { ENV } from '@env';
import { Dialogs } from '@ionic-native/dialogs';
import { Globalization } from '@ionic-native/globalization';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { AlertButton, AlertController, AlertOptions, LoadingController, Platform } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Observable } from 'rxjs/Observable';

import { DeviceModuleConfig } from './models';

@Injectable()
export class DeviceService {
    private modalTitle: string;
    private dialogsMode: string;


    private onlineObservable: Observable<any>;
    private offlineObservable: Observable<any>;
    private ionLoading: Loading|null = null;

    constructor(
        @Optional() config: DeviceModuleConfig,
        private platform: Platform,
        private network: Network,
        private splashScreen: SplashScreen,
        private keyboard: Keyboard,
        private spinnerDialog: SpinnerDialog,
        private loadingCtrl: LoadingController,
        private dialogs: Dialogs,
        private statusBar: StatusBar,
        private globalization: Globalization,
        private translateService: TranslateService,
        private alertCtrl: AlertController
    ) {
        if(config){
            if(config.modalTitle) this.modalTitle = config.modalTitle;
            if(config.dialogsMode) this.dialogsMode = config.dialogsMode;
        }
        // Create two Observable for online and offline notifications
        // to allow the whole app to subscribe to them with the custom functions
        // getOnlineObservable and getOfflineObservable
        this.onlineObservable = this.network.onConnect();
        this.offlineObservable = this.network.onDisconnect();
    }


    /**
    * Return true if the app running on Cordova, false otherwise
    * @returns {boolean}
    */
    isCordova(): boolean {
        return this.platform.is('cordova');
    }


    /**
    * Return true if the app running on Android device, false otherwise
    * @returns {boolean}
    */
    isAndroid(): boolean {
        return this.platform.is('android');
    }


    /**
    * Return true if the app running on iOS device, false otherwise
    * @returns {boolean}
    */
    isIos(): boolean {
        return this.platform.is('ios');
    }


    /**
    * Return true if the app running on Windows device, false otherwise
    * @returns {boolean}
    */
    isWindows(): boolean {
        return this.platform.is('windows');
    }


    /**
    * Return true if the device has internet connection available, false otherwise
    * @returns {boolean}
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
    * @returns {boolean}
    */
    isOffline(): boolean {
        return !this.isOnline();
    }


    /**
    * Return the Observable for online events emitted
    * @returns {Observable}
    */
    getOnlineObservable(): Observable<any> {
        return this.onlineObservable;
    }


    /**
    * Return the Observable for offline events emitted
    * @returns {Observable}
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
     * Set the default status bar style: dark text, for light backgrounds
     * @returns void
     */
    styleStatusBarAsDefault() : void {
        if (this.isCordova()) {
            this.statusBar.styleDefault();
        }
    }


    /**
     * Get the preferred language set on device
     * @returns {Promise<string>}
     */
    getPreferredLanguage() : Promise<string> {
        let defer: Promise<{value: string}>;
        if(this.isCordova()){
            defer = this.globalization.getPreferredLanguage();
        }
        else {
            defer = new Promise((resolve, reject) => { resolve(ENV.getPreferredLanguageDev) });
        }
        return defer.then(
            (lang: {value:string}) => {
                let final;
                try{
                    final = lang.value.split('-')[0].toLowerCase();
                }catch(e){ final = ''; }
                return final;
            }
        )
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

        message = this.translateService.instant(message);

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
    * Show a native or ionic simple alert dialog
    * @param  {string} message Dialog message
    * @param  {string} title Dialog title
    * @returns void
    */
    alert(message: string, title: string = this.modalTitle): void {
        this.hideLoading();

        if(this.dialogsMode === 'native'){
            let okButton = 'OK';
            try {
                message = this.translateService.instant(message);
                title = this.translateService.instant(title);
                okButton = this.translateService.instant(okButton);
            }
            catch (e) {}

            if (this.isCordova()) {
                this.dialogs.alert(message, title, okButton);
            }
            else {
                window.alert(message);
            }
        }
        else {
            this.ionicCustomAlert({
                title: title,
                message: message
            });
        }
    }


    /**
    * Show an ionic custom alert dialog
    * @param  {AlertOptions} options All Ionic alert options
    * @returns void
    */
   ionicCustomAlert(options: AlertOptions = {}){
        if(!options.title) options.title = this.modalTitle;
        if(!options.subTitle) options.subTitle = '';
        if(!options.message) options.message = '';
        if(!options.cssClass) options.cssClass = 'primary';
        if(!options.inputs) options.inputs = [];
        if(!options.buttons) options.buttons = [
            {
                text : this.translateService.instant('OK'),
                handler : () => {},
                cssClass : 'primary',
                role : ''
            },{
                text : this.translateService.instant('CANCEL'),
                handler : () => {},
                cssClass : 'primary',
                role : 'cancel'
            }
        ];
        if(!options.enableBackdropDismiss) options.enableBackdropDismiss = false;

        let alert = this.alertCtrl.create(options);
        alert.present();
    }


    /**
    * Show a native confirm dialog or the simple browser confirm
    * @param {string} message Dialog message
    * @param {string} title Dialog title
    * @param {AlertButton[]} buttons List of <AlertButton>
    */
    confirm(message: string, title: string = this.modalTitle, buttons: AlertButton[] = []) {
        this.hideLoading();

        message = this.translateService.instant(message);
        title = this.translateService.instant(title);
        if(buttons.length === 0){
            buttons = [{
                text: 'OK',
                cssClass: 'primary',
                handler: () => {}
            },{
                text: 'CANCEL',
                cssClass: 'primary',
                role: 'cancel',
                handler: () => {}
            }]
        }
        const buttonLabels = buttons.map((b: AlertButton) => {
            return this.translateService.instant(<string>b.text);
        });

        if(this.dialogsMode === 'native'){
            if (this.isCordova()) {
                this.dialogs.confirm(message, title, buttonLabels).then(
                    (buttonIndex: number) => {
                        // Decrement clicked button index because the plugin use 'one-based indexing'
                        buttonIndex--;
                        // Then execute the 'onClick' function if is defined
                        if (buttons[buttonIndex]) {
                            (buttons[buttonIndex] as any).handler();
                        }
                    }
                );
            }
            else {
                if (window.confirm(message)) {
                    (buttons[0] as any).handler();
                }
                else {
                    (buttons[1] as any).handler();
                }
            }
        }
        else {
            this.ionicCustomAlert({
                title: title,
                message: message,
                buttons: buttons
            });
        }
    }
}
