import { HttpHeaders } from '@angular/common/http';

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
        }
        catch(err){
            api = null;
        }
        return api;
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
        this.name = api.name;
        this.url = api.url;
        this.method = api.method || RequestMethods.GET;
        this.headers = api.headers || new HttpHeaders();
        this.timeout = api.timeout || 30000;
    }
}

export class LangConfig {
    public code: string;
    public label: string;
    public url: string;
    public isDefault: boolean;

    constructor(
        lang: LangConfig
    ) {
        this.code = lang.code;
        this.label = lang.label;
        this.url = lang.url;
        this.isDefault = lang.isDefault;
    }
}

export class Config {
    public lastModified: string;
    public versioning: VersioningConfig[];
    public backend: BackendConfig;
    public langs: LangConfig[];
    public loggerLevel: string;
    public devMode: boolean;



    constructor(
        config: Config
    ) {
        this.versioning = config.versioning.map((v: VersioningConfig) => { return new VersioningConfig(v); });
        this.backend = new BackendConfig(config.backend);
        this.langs = config.langs.map((l: LangConfig) => { return new LangConfig(l); });
        this.loggerLevel = config.loggerLevel || 'ERROR';
        this.devMode = config.devMode || false;
    }

}


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
