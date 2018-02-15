import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { RequestMethods } from '@app/core/api/api.models';
import { DeviceService } from '@core/device/device.service';
import { Storage } from '@ionic/storage';

import { ConfigModuleConfig } from './config.config';
import { ApiConfig, Config, LangConfig } from './config.model';

const storageKeys = {
    config: 'config',
    lastLang: 'lastLang',
    lang: 'lang-{CODE}'
};

@Injectable()
export class ConfigService {
    private url: string;
    private config: Config;
    public configCompleated: Promise<any>;

    constructor(
        public configModule: ConfigModuleConfig,
        private deviceService: DeviceService,
        private storage: Storage,
        private http: HttpClient
    ) {
        this.url = configModule.url;
        this.configCompleated = this.init();
    }


    /**
     * Returns the last config file stored in localStorage with last modified date
     * @returns {Promise<Config>}
     */
    private getLastConfig(): Promise<Config> {
        return this.storage.get(storageKeys.config)
    }


    private init() {
        return new Promise<any>((resolve, reject) => {
            this.download().then(
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


    /**
     * Download the external config file and store it in localStorage
     * @returns {Promise<any>}
     */
    private download() {
        return new Promise<any>((resolve, reject) => {
            this.getLastConfig().then(
                lastConfig => {
                    // Try to download the new config file only if it was modified
                    let headers = new HttpHeaders();
                    if(lastConfig && lastConfig.lastModified){
                        headers = headers.set('If-Modified-Since', lastConfig.lastModified);
                    }
                    this.http.get<Config>(this.url, {headers, observe: 'response'}).subscribe(
                        (res: HttpResponse<Config>) => {
                            // If config.json was updated initialize it and update the lastModified property
                            (<Config>res.body).lastModified = <string>res.headers.get('Last-Modified');
                            this.config = new Config(<Config>res.body);
                            this.storage.set(storageKeys.config, res.body);
                            resolve();
                        },
                        (err: HttpErrorResponse) => {
                            // If the HTTP status is 304 the config.json was not modified
                            // I initialize Config with localStorage version
                            if(lastConfig && err.status === 304){
                                this.config = new Config(lastConfig);
                                resolve();
                            }
                            // The download fails and a local config doesn't exists, so throw an error
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
            this.getMainlanguage().then(
                (lastLang: LangConfig) => {
                    // Download the json language (if necessary)
                    this.downloadLang(lastLang).then(
                        resolve,
                        reject
                    );
                }
            );
        });
    }


    /**
     * Get api configuration from the config.json file
     * @param apiName string Attribute name of requested api
     * @returns {ApiConfig|null}
     */
    getApiConfig(apiName:string): ApiConfig|null {
        return this.config.backend.getApiConfig(apiName);
    }


    /**
     * Get api configuration from the config.json file
     * @param url string HTTP request's url
     * @param method string HTTP request's method
     * @returns {ApiConfig|null}
     */
    createNewApiConfig(url: string, method: string = RequestMethods.GET): ApiConfig {
        return this.config.backend.createNewApiConfig(url, method);
    }


    getMainlanguage(): Promise<LangConfig> {
        return new Promise((resolve, reject) => {
            // Search last used language in localStorage
            this.storage.get(storageKeys.lastLang).then((lastLang: LangConfig) => {
                // If last used language doesn't exists
                if(!lastLang){
                    // Get the system language
                    this.deviceService.getPreferredLanguage().then((systemLang: string) => {
                        // Search the system language in available languages
                        let langConfig = this.config.translations.getConfig(systemLang);
                        // If lang doesn't exist
                        if(!langConfig){
                            // Get the default language from Config
                            langConfig = this.config.translations.getDefault();
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


    private downloadLang(lang: LangConfig) {
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
                    resolve();
                },
                (err: HttpErrorResponse) => {
                    // If the HTTP status of lang json is not 304 throw an error
                    reject(err);
                });
        });
    }

}
