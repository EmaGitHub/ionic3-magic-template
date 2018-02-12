import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http/src/response';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ConfigModuleConfig } from './config.config';
import { Config } from './config.model';

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
        private http: HttpClient
    ) {
        this.url = configModule.url;
    }

    /**
     * Returns the last config file stored in localStorage with last modified date
     */
    private getLastConfig(): Promise<Config> {
        return this.storage.get(storageKeys.config)
    }

    /**
     * Download the external config file and store it in localStorage
     */
    update() {
        return new Promise((resolve, reject) => {
            this.getLastConfig().then(
                lastConfig => {
                    // Try to download the new config file only if it was modified
                    let headers = new HttpHeaders();
                    if(lastConfig && lastConfig.lastModified){
                        headers.append('If-Modified-Since', lastConfig.lastModified);
                    }
                    this.http.get(this.url, {headers, observe: 'response'}).subscribe(
                        (response: HttpResponse<Config>) => {
                            this.config = <Config>response.body;
                            this.config.lastModified = <string>response.headers.get('Last-Modified');
                            this.storage.set(storageKeys.config, this.config);
                            resolve();
                        },
                        (err: Error) => {
                            // The download fails so, if a local config doesn't exists throw an error
                            if(!this.config){
                                reject(new Error('Error during app initialization.\nPlease, check your Internet connection and restart the app.'));
                            }
                        });
                }
            );
        });
    }
}
