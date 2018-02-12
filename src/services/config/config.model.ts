import { HttpHeaders } from '@angular/common/http';
import { Optional } from '@angular/core';

export class ConfigVersioning {

    constructor(
        public platform: string,
        public isLastVersion: boolean,
        public isMandatoryUpdate: boolean,
        public storeLink: string
    ) { }
}

export class BackendConfig {

    constructor(
        public baseUrl: string,
        public api: ApiConfig[],
        public environment?: string
    ) { }

    porcaPuttana(){

    }
}

export class ApiConfig {

    constructor(
        public name: string,
        public url: string,
        public method: string = RequestMethods.GET,
        public headers: HttpHeaders = new HttpHeaders(),
        public timeout: number = 30000,
    ) { }
}

export class ConfigLangs {

    constructor(
        public code: string,
        public label: string,
        public url: string,
        public isDefault: boolean
    ) { }
}

export class Config {
    public lastModified: string;

    constructor(
        @Optional() public versioning: ConfigVersioning[],
        @Optional() public backend: BackendConfig,
        @Optional() public langs: ConfigLangs[],
        @Optional() public loggerLevel: string,
        @Optional() public devMode: boolean
    ) { }

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
