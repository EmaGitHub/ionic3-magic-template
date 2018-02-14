import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoggerService } from '@services/logger/logger.service';

import { ConfigModuleConfig } from './config.config';
import { ApiConfig, Config } from './config.model';

const storageKeys = {
    config: 'config'
};

@Injectable()
export class ConfigService {
    private url: string;
    private config: Config;

    constructor(
        configModule: ConfigModuleConfig,
        private storage: Storage,
        private http: HttpClient,
        private logger: LoggerService
    ) {
        this.url = configModule.url;
    }

    /**
     * Returns the last config file stored in localStorage with last modified date
     * @returns {Promise<Config>}
     */
    private getLastConfig(): Promise<Config> {
        return this.storage.get(storageKeys.config)
    }

    /**
     * Download the external config file and store it in localStorage
     * @returns {Promise<any>}
     */
    update(): Promise<any> {
        return new Promise((resolve, reject) => {
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
                            res.body.lastModified = <string>res.headers.get('Last-Modified');
                            this.config = new Config(<Config>res.body);
                            this.storage.set(storageKeys.config, res.body);
                            resolve();
                        },
                        (err: HttpErrorResponse) => {
                            // If the HTTP status is 304 the config.json was not modified
                            // so I initialize Config with localStorage version
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
     * Get api configuration from the config.json file
     * @param apiName string Attribute name of requested api
     * @returns {ApiConfig|null}
     */
    getApiConfig(apiName:string): ApiConfig|null {
        return this.config.backend.getApiConfig(apiName);
    }
}
