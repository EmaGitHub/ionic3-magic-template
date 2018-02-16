import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { DeviceService } from '@core/device/device.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { TranslatorModuleConfig } from './translator.config';
import { Translator, TranslatorLang } from './translator.model';

const storageKeys = {
    lastTranslator: 'translator',
    lastLang: 'last_lang',
    lang: 'lang_{CODE}'
};

@Injectable()
export class TranslatorService {
    private url: string;
    private translator: Translator|undefined;
    private storage: Storage;
    public initCompleted: Promise<any>;

    constructor(
        public config: TranslatorModuleConfig,
        private deviceService: DeviceService,
        private translateService: TranslateService,
        private http: HttpClient
    ) {
        this.url = config.url;
        this.storage = new Storage({
            name : config.storePrefix || 'storage',
            storeName : 'translator',
            driverOrder : ['localstorage']
        });
        this.initCompleted = this.init().then(
            () => { console.log('translator init completed') },
            console.error
        );
    }


    /**
     * Returns the last translator file stored in localStorage with last modified date
     * @returns {Promise<Translator>}
     */
    private getLastTranslator(): Promise<Translator> {
        return this.storage.get(storageKeys.lastTranslator)
    }


    /**
     * Download the translator config file and init default language
     */
    private init() {
        return new Promise<any>((resolve, reject) => {
            this.download().then(
                (translator: Translator) => {
                    // Create the Translator
                    this.translator = new Translator(translator);
                    // Save translator in storage
                    this.storage.set(storageKeys.lastTranslator, translator);
                    // Init default language and download all other languages
                    this.initLangs().then(
                        resolve,
                        reject
                    )
                },
                reject
            );
        });
    }


    /**
     * Download the external translator config file and store it in localStorage
     * @returns {Promise<any>}
     */
    private download() {
        return new Promise<any>((resolve, reject) => {
            this.getLastTranslator().then(
                lastTranslator => {
                    // Try to download the new translator config file only if it was modified
                    let headers = new HttpHeaders();
                    if(lastTranslator && lastTranslator.lastModified){
                        headers = headers.set('If-Modified-Since', lastTranslator.lastModified);
                    }
                    this.http.get<Translator>(this.url, {headers, observe: 'response'}).subscribe(
                        (res: HttpResponse<Translator>) => {
                            // If translator json was modified, update the lastModified property
                            (<Translator>res.body).lastModified = <string>res.headers.get('Last-Modified');
                            resolve(res.body);
                        },
                        (err: HttpErrorResponse) => {
                            // If the HTTP status is 304 the translator json was not modified
                            // Initialize Translator with localStorage version
                            if(lastTranslator && err.status === 304){
                                resolve(lastTranslator);
                            }
                            // The download fails and a local translator config doesn't exists, so throw an error
                            else {
                                reject(err);
                            }
                        });
                }
            );
        });
    }


    /**
    * Set default (fallback) language
    * Set the current Initialize langs file and app language
    * @returns {Promise<any>}
    */
   private initLangs() {
        return new Promise((resolve, reject) => {
            // Set the default language
            this.setDefaultLanguage();
            // Get the last used language if exists, or system one, or default one
            this.getLastLanguage().then(
                (lastLang: TranslatorLang) => {
                    // Download the json of last language (if necessary)
                    // this.downloadLang(lastLang).then(
                    //     (updatedLastLanguage: TranslatorLang) => {
                    //         // Set the main language as default
                    //         this.setLanguage(updatedLastLanguage);
                    //         // Resolve the promise
                    //         resolve();
                    //         // And start to download for other languages (background mode)
                    //         const otherLanguages = (<Translator>this.translator).langs.filter((l: TranslatorLang) => {
                    //             return l.code !== updatedLastLanguage.code;
                    //         });
                    //         this.downloadLangs(otherLanguages);
                    //     },
                    //     reject
                    // );

                    // Set the main language as default
                    // The TranslatorLoader will automatically download the json language
                    this.setLanguage(lastLang);
                    // Resolve the promise
                    resolve();
                    // And start to download for other languages (background mode)
                    const otherLanguages = (<Translator>this.translator).langs.filter((l: TranslatorLang) => {
                        return l.code !== lastLang.code;
                    });
                    this.downloadLangs(otherLanguages);
                },
                reject
            );
        });
    }


    /**
     * Get the last used language if exists
     * If there is no last language set fetch the system language or defaut one if not available
     *
     * @returns {Promise<TranslatorLang>}
     */
    private getLastLanguage(): Promise<TranslatorLang> {
        return new Promise((resolve, reject) => {
            // Search last used language in localStorage
            this.storage.get(storageKeys.lastLang).then((lastLang: TranslatorLang) => {
                // If last used language doesn't exists
                if(!lastLang){
                    // Get the system language
                    this.deviceService.getPreferredLanguage().then((systemLang: string) => {
                        // Search the system language in available languages
                        let translatorLang = (<Translator>this.translator).getConfig(systemLang);
                        // If lang doesn't exist
                        if(!translatorLang){
                            // Get the default language from Config
                            translatorLang = (<Translator>this.translator).getDefault();
                        }
                        resolve(translatorLang);
                    })
                }
                else {
                    resolve(lastLang);
                }
            });
        });
    }


    /**
     * Set the default language as fallback when a translation isn't found in the current language
     * @param  {TranslatorLang} lang Lang to set as default
     * @returns {void}
     */
    private setDefaultLanguage() {
        const lang = (<Translator>this.translator).getDefault();
        this.translateService.setDefaultLang(lang.code);
    }


    /**
     * Download the json of requested language
     * @param  {TranslatorLang|string} lang TranslatorLang or code of lang to download
     * @returns {Promise}
     */
    private downloadLang(lang: TranslatorLang|string): Promise<any> {
        if(typeof lang === 'string'){
            lang = <TranslatorLang>(<Translator>this.translator).getConfig(lang);
        }
        let headers = new HttpHeaders();
        // If the lang file was already downloaded append the 'If-Modified-Since' header
        if(lang && lang.lastModified){
            headers = headers.set('If-Modified-Since', lang.lastModified);
        }
        return new Promise((resolve, reject) => {
            this.http.get<object>((<TranslatorLang>lang).url, {headers, observe: 'response'}).subscribe(
                (res: HttpResponse<object>) => {
                    (<TranslatorLang>lang).lastModified = <string>res.headers.get('Last-Modified');
                    (<TranslatorLang>lang).translations = res.body;
                    this.storage.set(storageKeys.lang.replace('{CODE}', (<TranslatorLang>lang).code), lang);
                    resolve(lang);
                },
                (err: HttpErrorResponse) => {
                    // If the HTTP status is 304 the language json was not modified
                    // Resolve localStorage version of language (if exists)
                    if((<TranslatorLang>lang).lastModified && err.status === 304){
                        resolve(lang);
                    }
                    // The download fails and a local language doesn't exists, so throw an error
                    else {
                        reject(err);
                    }
                });
        });
    }


    /**
     * @param  {TranslatorLang[]} langs
     * @returns Promise
     */
    private downloadLangs(langs: TranslatorLang[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if(langs.length > 0){
                let lang = langs.pop();
                this.downloadLang(<TranslatorLang>lang).then(
                    () => {
                        this.downloadLangs(langs);
                    }
                );
            }
            else {
                resolve();
            }
        });
    }

    /**
     * Get the current used language
     * @returns {TranslatorLang}
     */
    getCurrentLanguage(): TranslatorLang | undefined {
        return (<Translator>this.translator).getConfig(this.translateService.currentLang);
    }


    /**
     * Set the last used language for the next app bootstrap
     * @param  {TranslatorLang} lang Lang to set as last
     * @returns {void}
     */
    setLanguage(lang: TranslatorLang|string): void {
        if(typeof lang === 'string'){
            lang = <TranslatorLang>(<Translator>this.translator).getConfig(lang);
        }
        if(lang){
            this.storage.set(storageKeys.lastLang, lang);
            this.translateService.use(lang.code);
        }
    }

}
