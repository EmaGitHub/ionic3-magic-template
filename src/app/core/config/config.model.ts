import { HttpHeaders } from '@angular/common/http';

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    PATCH = 'PATCH',
    JSONP = 'JSONP'
}

export class VersioningConfig {
    public platform: string;
    public isLastVersion: boolean;
    public isMandatoryUpdate: boolean;
    public storeLink: string;

    constructor(
        versioning: VersioningConfig
    ) {
        this.platform = versioning.platform;
        this.isLastVersion = versioning.isLastVersion;
        this.isMandatoryUpdate = versioning.isMandatoryUpdate;
        this.storeLink = versioning.storeLink;
    }
}

export class BackendConfig {
    public baseUrl: string;
    public api: ApiConfig[];
    public environment?: string;

    constructor(
        backend: BackendConfig
    ) {
        this.baseUrl = backend.baseUrl;
        this.api = backend.api.map((a: ApiConfig) => { return new ApiConfig(a); });
        this.environment = backend.environment || 'PROD';
    }


    public getApiConfig(apiName:string): ApiConfig|null {
        let api;
        try {
            api = <ApiConfig>this.api.find(api => api.name === apiName);
            api.url = this.prepareUrl(api.url);
        }
        catch(err){
            api = null;
        }
        return api;
    }


    /**
     * Get api configuration from the config.json file
     * @param url string HTTP request's url
     * @param method string HTTP request's method
     * @returns {ApiConfig|null}
     */
    public createNewApiConfig(url: string, method: string = RequestMethods.GET): ApiConfig {
        url = this.prepareUrl(url);
        let apiConfig = new ApiConfig(<ApiConfig>{
            url : url,
            method : method
        });
        return apiConfig;
    }


    /**
     * Add baseUrl as prefix if the api url is relative
     * @param {string} url Relative api url
     */
    private prepareUrl(url: string): string {
        if (url.trim().indexOf('http') !== 0) {
            url = (this.baseUrl + url).trim();
        }
        return url;
    }
}

export class ApiConfig {
    public name: string;
    public url: string;
    public method: string;
    public headers: HttpHeaders;
    public timeout: number;

    constructor(
        api: ApiConfig
    ) {
        this.name = api.name || '';
        this.url = api.url;
        this.method = (api.method || RequestMethods.GET).toUpperCase();
        this.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');
        if(api.headers){
            for (let key in api.headers){
                this.headers = this.headers.set(key, (<any>api.headers)[key].toString());
            }
        }
        this.timeout = api.timeout || 30000;
    }
}

export class Config {
    public lastModified: string | null;
    public versioning: VersioningConfig[];
    public backend: BackendConfig;
    public loggerLevel: string;
    public devMode: boolean;

    constructor(
        config: Config
    ) {
        this.versioning = config.versioning.map((v: VersioningConfig) => { return new VersioningConfig(v); });
        this.backend = new BackendConfig(config.backend);
        this.loggerLevel = config.loggerLevel || 'ERROR';
        this.devMode = config.devMode || false;
        this.lastModified = config.lastModified || null;
    }

}
