import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable, Optional } from '@angular/core';
import { DeviceService } from '@core/device/device.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { I18nModuleConfig } from './i18n.config';
import { I18n, Language } from './i18n.model';

const storageKeys = {
    i18n: 'i18n',
    lastLang: 'last_lang',
    lang: 'lang_{CODE}'
};

@Injectable()
export class I18nService {
    private url: string;
    private i18n: I18n|undefined;
    private storage: Storage;
    public initCompleted: Promise<any>;

    constructor(
        @Optional() public config: I18nModuleConfig,
        private deviceService: DeviceService,
        private translateService: TranslateService,
        private http: HttpClient
    ) {
        this.url = config.url;
        this.storage = new Storage({
            name : config.storePrefix || 'storage',
            storeName : 'i18n',
            driverOrder : ['localstorage']
        });
        this.initCompleted = this.init();
    }


    /**
     * Returns the last i18n file stored in localStorage with last modified date
     * @returns {Promise<I18n>}
     */
    private getLastI18n(): Promise<I18n> {
        return this.storage.get(storageKeys.i18n)
    }


    /**
     * Download the i18n config file and init default language
     */
    private init() {
        return new Promise<any>((resolve, reject) => {
            this.download().then(
                (i18n: I18n) => {
                    // Create the I18n
                    this.i18n = new I18n(i18n);
                    // Save i18n in storage
                    this.storage.set(storageKeys.i18n, i18n);
                    // Init default i18n and download all other languages
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
     * Download the external i18n config file and store it in localStorage
     * @returns {Promise<any>}
     */
    private download() {
        return new Promise<any>((resolve, reject) => {
            this.getLastI18n().then(
                lastI18n => {
                    // Try to download the new i18n config file only if it was modified
                    let headers = new HttpHeaders();
                    if(lastI18n && lastI18n.lastModified){
                        headers = headers.set('If-Modified-Since', lastI18n.lastModified);
                    }
                    this.http.get<I18n>(this.url, {headers, observe: 'response'}).subscribe(
                        (res: HttpResponse<I18n>) => {
                            // If i18n json was modified, update the lastModified property
                            (<I18n>res.body).lastModified = <string>res.headers.get('Last-Modified');
                            resolve(res.body);
                        },
                        (err: HttpErrorResponse) => {
                            // If the HTTP status is 304 the i18n json was not modified
                            // Initialize I18n with localStorage version
                            if(lastI18n && err.status === 304){
                                resolve(lastI18n);
                            }
                            // The download fails and a local i18n config doesn't exists, so throw an error
                            else {
                                console.error(err);
                                reject(new Error('ERR_MISSING_I18N_CONFIG_FILE'));
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
                (lastLang: Language) => {
                    // Download the json of last language (if necessary)
                    // this.downloadLang(lastLang).then(
                    //     (updatedLastLanguage: Language) => {
                    //         // Set the main language as default
                    //         this.setLanguage(updatedLastLanguage);
                    //         // Resolve the promise
                    //         resolve();
                    //         // And start to download for other languages (background mode)
                    //         const otherLanguages = (<I18n>this.language).langs.filter((l: Language) => {
                    //             return l.code !== updatedLastLanguage.code;
                    //         });
                    //         this.downloadLangs(otherLanguages);
                    //     },
                    //     reject
                    // );

                    // Set the main language as default
                    // The CustomTranslateLoader will automatically download the json language
                    this.setLanguage(lastLang);
                    // Resolve the promise
                    resolve();
                    // And start to download for other languages (background mode)
                    const otherLanguages = (<I18n>this.i18n).langs.filter((l: Language) => {
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
     * @returns {Promise<Language>}
     */
    private getLastLanguage(): Promise<Language> {
        return new Promise((resolve, reject) => {
            // Search last used language in localStorage
            this.storage.get(storageKeys.lastLang).then((lastLang: Language) => {
                // If last used language doesn't exists
                if(!lastLang){
                    // Get the system language
                    this.deviceService.getPreferredLanguage().then((systemLang: string) => {
                        // Search the system language in available languages
                        let lang = (<I18n>this.i18n).getConfig(systemLang);
                        // If lang doesn't exist
                        if(!lang){
                            // Get the default language from Config
                            lang = (<I18n>this.i18n).getDefault();
                        }
                        resolve(lang);
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
     * @param  {Language} lang Language to set as default
     * @returns {void}
     */
    private setDefaultLanguage() {
        const lang = (<I18n>this.i18n).getDefault();
        this.translateService.setDefaultLang(lang.code);
    }


    /**
     * @param  {Language[]} langs
     * @returns Promise
     */
    private downloadLangs(langs: Language[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if(langs.length > 0){
                let lang = langs.pop();
                this.downloadLang(<Language>lang).then(
                    () => {
                        this.downloadLangs(langs);
                    },
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
     * Download the json of requested language
     * @param  {Language|string} lang Language or code of lang to download
     * @returns {Promise}
     */
    downloadLang(lang: Language|string): Promise<any> {
        if(typeof lang === 'string'){
            lang = <Language>(<I18n>this.i18n).getConfig(lang);
        }
        let headers = new HttpHeaders();
        // If the lang file was already downloaded append the 'If-Modified-Since' header
        if(lang && lang.lastModified){
            headers = headers.set('If-Modified-Since', lang.lastModified);
        }
        return new Promise((resolve, reject) => {
            this.http.get<object>((<Language>lang).url, {headers, observe: 'response'}).subscribe(
                (res: HttpResponse<object>) => {
                    (<Language>lang).lastModified = <string>res.headers.get('Last-Modified');
                    (<Language>lang).translations = res.body;
                    this.storage.set(storageKeys.lang.replace('{CODE}', (<Language>lang).code), lang);
                    resolve(lang);
                },
                (err: HttpErrorResponse) => {
                    // If the HTTP status is 304 the language json was not modified
                    // Resolve localStorage version of language (if exists)
                    if((<Language>lang).lastModified && err.status === 304){
                        resolve(lang);
                    }
                    // The download fails and a local language doesn't exists, so throw an error
                    else {
                        console.error(err);
                        reject(new Error('ERR_MISSING_LANG_FILE'));
                    }
                });
        });
    }


    /**
     * Get the current used language
     * @returns {Language}
     */
    getCurrentLanguage(): Language | undefined {
        return (<I18n>this.i18n).getConfig(this.translateService.currentLang);
    }


    /**
     * Set the last used language for the next app bootstrap
     * @param  {Language} lang Language to set as last
     * @returns {void}
     */
    setLanguage(lang: Language|string): void {
        if(typeof lang === 'string'){
            lang = <Language>(<I18n>this.i18n).getConfig(lang);
        }
        if(lang){
            this.storage.set(storageKeys.lastLang, lang);
            this.translateService.use(lang.code);
        }
    }

}
