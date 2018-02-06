import { Injectable } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Network } from '@ionic-native/network';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Observable } from 'rxjs/Observable';

import { DeviceConfig } from './device.config';

@Injectable()
export class DeviceService {
    private onlineObservable: Observable<any>;
    private offlineObservable: Observable<any>;
    private ionLoading: Loading;

    constructor(
        private config: DeviceConfig,
        private platform: Platform,
        private network: Network,
        private splashScreen: SplashScreen,
        private keyboard: Keyboard,
        private spinnerDialog: SpinnerDialog,
        private loadingCtrl: LoadingController
    ) {
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
            // tslint:disable-next-line
            return connectionType !== window.Connection.UNKNOWN && connectionType !== window.Connection.NONE;
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

        if (this.isCordova()) {
            this.spinnerDialog.show(this.config.getModalTitle(), message, true);
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

}


// import device from 'device.js';
// import _ from 'lodash';
// import f7Config from '../../f7.config.js';
// import Translator from 'js/utils/Translator';
// const STATUSBAR_THEMES_COLORS = {
//     red        : '#f44336',
//     pink       : '#e91e63',
//     purple     : '#9c27b0',
//     deeppurple : '#673ab7',
//     indigo     : '#E10098',
//     blue       : '#2196f3',
//     lightblue  : '#03a9f4',
//     cyan       : '#00bcd4',
//     teal       : '#009688',
//     green      : '#4caf50',
//     lightgreen : '#8bc34a',
//     lime       : '#cddc39',
//     yellow     : '#ffeb3b',
//     amber      : '#ffc107',
//     orange     : '#ff9800',
//     deeporange : '#ff5722',
//     brown      : '#795548',
//     gray       : '#9e9e9e',
//     bluegray   : '#607d8b',
//     white      : '#ffffff',
//     black      : '#000000'
// };

// class Device {
//     constructor() {
//         // Attuale theme impostato sulal statusbar
//         this._statusBarTheme = null;
//     }


//     /**
//      * Mostra una notifica sul device
//      * @param {Object} options Tutte le opzioni fornite dal notification di F7
//      */
//     showNotification(options = {}) {
//         if (!options.message) {
//             options.message = 'Notification';
//         }
//         options.message = (options.message);
//         if (!options.button) {
//             options.button = {
//                 text  : ('CLOSE'),
//                 color : 'teal',
//                 close : true
//             };
//         }
//         if (!options.hold) {
//             options.hold = 2000;
//         }
//         window.f7.addNotification(options);
//     }

//     /**
//      * Mostra un avviso all'utente
//      * @param {String} text - Corpo dell'avviso
//      * @param {String} title - Se esiste è il titolo dell'avviso
//      * @param {function} callback - Callback da eseguire alla pressione del tasto OK
//      */
//     alert(text, title, callback) {
//         this.hideLoader();

//         if (!title) {
//             title = f7Config.modalTitle;
//         }

//         let okButton = 'OK';
//         try {
//             text = Translator.t(text);
//             title = Translator.t(title);
//             okButton = Translator.t(okButton);
//         }
//         catch (e) {}

//         if (this.isCordova() && navigator.notification) {
//             navigator.notification.alert(
//                 text,
//                 callback,
//                 title,
//                 okButton
//             );
//         }
//         else if (window.f7) {
//             window.f7.alert(text, title, callback);
//         }
//         else {
//             window.alert(text);
//         }
//     }

//     /**
//      * Mostra una richiesta di conferma all'utente
//      * @param {String} text - Corpo del confirm
//      * @param {String} title - Se esiste è il titolo dell'avviso
//      * @param {String[]} buttons - Lista dei tasti da mostrare con titolo e callback
//      */
//     confirm({text, title, buttons = [{title : 'Ok'}, {title : 'Cancel'}]}) {
//         this.hideLoader();

//         if (!title) {
//             title = f7Config.modalTitle;
//         }

//         // Traduco i testi dei bottoni
//         const translatedButtons = _.map(buttons, b => {
//             return Translator.t(b.title);
//         });

//         if (this.isCordova() && navigator.notification) {
//             navigator.notification.confirm(
//                 Translator.t(text),
//                 buttonIndex => {
//                     // Se definita lancio la callback del bottone premuto
//                     buttonIndex--;
//                     if (buttons[buttonIndex] && buttons[buttonIndex].onClick) {
//                         buttons[buttonIndex].onClick();
//                     }
//                 },
//                 Translator.t(title),
//                 translatedButtons
//             );
//         }
//         else {
//             if (window.confirm(Translator.t(text))) {
//                 if (buttons[0] && buttons[0].onClick) {
//                     buttons[0].onClick();
//                 }
//             }
//             else {
//                 if (buttons[1] && buttons[1].onClick) {
//                     buttons[1].onClick();
//                 }
//             }
//         }
//     }

//     /**
//      * Mostra una modale all'utente
//      * @param {String} title - Titolo della modale
//      * @param {String} text - Messaggio della modale
//      * @param {String} afterText - Messaggio o HTML mostrato sotto al `text`
//      * @param {String[]} buttons - Lista dei tasti da mostrare
//      * @param {Boolean} verticalButtons - Flag per indicare la visualizzazione verticale dei tasti
//      * @param {Function} onClick - Callback da eseguire a seguito del click su uno qualsiasi dei tasti
//      */
//     modal({title, text = '', afterText = null, buttons = [{text : 'OK'}], verticalButtons = false, onClick}) {
//         this.hideLoader();

//         if (!title) {
//             title = f7Config.modalTitle;
//         }

//         window.f7.modal({
//             title : Translator.t(title),
//             text  : Translator.t(text),
//             afterText,
//             buttons,
//             verticalButtons,
//             onClick});
//     }
// }

// export default new Device();
