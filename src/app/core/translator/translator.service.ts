import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { DeviceService } from '@core/device/device.service';
import { Storage } from '@ionic/storage';

import { TranslatorModuleConfig } from './translator.config';
import { LangConfig, Translator } from './translator.model';

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
     * Init Translator
     */
    private init() {
        return new Promise<any>((resolve, reject) => {
            this.initTranslator().then(
                () => {
                    this.initLangs().then(
                        resolve,
                        reject
                    )
                },
                reject
            );
        });
    }

    private initTranslator() {
        return new Promise((resolve, reject) => {
            this.download().then(
                (translator: Translator) => {
                    this.translator = new Translator(translator);
                    this.storage.set(storageKeys.lastTranslator, translator);
                    resolve();
                },
                reject
            )
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
    * Initialize langs file and app language
    * @returns {Promise<any>}
    */
   private initLangs() {
        return new Promise((resolve, reject) => {
            // Get the last used language if exists, or system one, or default one
            return this.getLastLanguage().then(
                (lastLang: LangConfig) => {
                    // Download the json of last language (if necessary)
                    this.downloadLang(lastLang).then(
                        (updatedLastLanguage: LangConfig) => {
                            // Set the main language as default
                            this.setLastLanguage(updatedLastLanguage);
                            // Resolve the promise
                            resolve();
                            // And start to download for other languages (background mode)
                            const otherLanguages = (<Translator>this.translator).langs.filter((l: LangConfig) => {
                                return l.code !== updatedLastLanguage.code;
                            });
                            this.downloadLangs(otherLanguages);
                        },
                        reject
                    );
                }
            );
        });
    }


    /**
     * Get the last used language if exists
     * If there is no last language set fetch the system language or defaut one if not available
     *
     * @returns {Promise<LangConfig>}
     */
    getLastLanguage(): Promise<LangConfig> {
        return new Promise((resolve, reject) => {
            // Search last used language in localStorage
            this.storage.get(storageKeys.lastLang).then((lastLang: LangConfig) => {
                // If last used language doesn't exists
                if(!lastLang){
                    // Get the system language
                    this.deviceService.getPreferredLanguage().then((systemLang: string) => {
                        // Search the system language in available languages
                        let langConfig = (<Translator>this.translator).getConfig(systemLang);
                        // If lang doesn't exist
                        if(!langConfig){
                            // Get the default language from Config
                            langConfig = (<Translator>this.translator).getDefault();
                        }
                        resolve(langConfig);
                    })
                }
                else {
                    resolve(lastLang);
                }
            });
        });
    }

    /**
     * Set the default language for the next app bootstrap
     * @param  {LangConfig} lang Lang to set as default
     * @returns {void}
     */
    setLastLanguage(lang: LangConfig): void {
        this.storage.set(storageKeys.lastLang, lang);
    }


    /**
     * Download the json of requested language
     * @param  {LangConfig} lang Lang to download
     * @returns {Promise}
     */
    private downloadLang(lang: LangConfig): Promise<any> {
        let headers = new HttpHeaders();
        // If the lang file was already downloaded append the 'If-Modified-Since' header
        if(lang && lang.lastModified){
            headers = headers.set('If-Modified-Since', lang.lastModified);
        }
        return new Promise((resolve, reject) => {
            this.http.get<object>(lang.url, {headers, observe: 'response'}).subscribe(
                (res: HttpResponse<object>) => {
                    lang.lastModified = <string>res.headers.get('Last-Modified');
                    this.storage.set(storageKeys.lang.replace('{CODE}', lang.code), res.body);
                    resolve(lang);
                },
                (err: HttpErrorResponse) => {
                    // If the HTTP status is 304 the language json was not modified
                    // Resolve localStorage version of language (if exists)
                    if(lang.lastModified && err.status === 304){
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
     * @param  {LangConfig[]} langs
     * @returns Promise
     */
    private downloadLangs(langs: LangConfig[]): Promise<any> {
        return new Promise((resolve, reject) => {
            if(langs.length > 0){
                let lang = langs.pop();
                this.downloadLang(<LangConfig>lang).then(
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

}
