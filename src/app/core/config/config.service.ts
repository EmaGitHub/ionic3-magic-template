import 'rxjs/Rx';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ApiConfig, Config, ConfigModuleConfig, RequestMethods } from './models';

const storageKeys = {
    lastConfig: 'last'
};

@Injectable()
export class ConfigService {
    private url: string;
    private config: Config|undefined;
    private storage: Storage;
    public initCompleted: Promise<any>;

    constructor(
        public configModule: ConfigModuleConfig,
        private http: HttpClient
    ) {
        this.url = configModule.url;
        this.storage = new Storage({
            name : configModule.storePrefix || 'storage',
            storeName: 'config',
            driverOrder : ['localstorage']
        });
        this.initCompleted = this.init();
    }


    /**
     * Returns the last config file stored in localStorage with last modified date
     * @returns {Promise<Config>}
     */
    private getLastConfig(): Promise<Config> {
        return this.storage.get(storageKeys.lastConfig)
    }


    /**
     * Init app
     */
    private init() {
        return new Promise<any>((resolve, reject) => {
            this.initConfig().then(
                () => {
                    // Check versioning...
                    resolve();
                },
                reject
            );
        });
    }

    private initConfig() {
        return new Promise((resolve, reject) => {
            this.download().then(
                (config: Config) => {
                    this.config = new Config(config);
                    this.storage.set(storageKeys.lastConfig, config);
                    resolve();
                },
                reject
            )
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
                            resolve(res.body);
                        },
                        (err: HttpErrorResponse) => {
                            // If the HTTP status is 304 the config.json was not modified
                            // Initialize Config with localStorage version
                            if(lastConfig && err.status === 304){
                                resolve(lastConfig);
                            }
                            // The download fails and a local config doesn't exists, so throw an error
                            else {
                                console.error(err);
                                reject(new Error('ERR_APP_MISSING_CONFIG_FILE'));
                            }
                        });
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
        return (<Config>this.config).backend.getApiConfig(apiName);
    }


    /**
     * Get api configuration from the config.json file
     * @param url string HTTP request's url
     * @param method string HTTP request's method
     * @returns {ApiConfig|null}
     */
    createNewApiConfig(url: string, method: string = RequestMethods.GET): ApiConfig {
        return (<Config>this.config).backend.createNewApiConfig(url, method);
    }
}
