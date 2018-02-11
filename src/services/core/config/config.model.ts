import { HttpHeaders } from '@angular/common/http';

export class ConfigVersioning {

    constructor(
        private platform: string,
        private isLastVersion: boolean,
        private isMandatoryUpdate: boolean,
        private storeLink: string
    ) { }
}

export class BackendConfig {

    constructor(
        private baseUrl: string,
        private api: ApiConfig[],
        private environment?: string
    ) { }
}

export class ApiConfig {

    constructor(
        private name: string,
        private url: string,
        private method: string = RequestMethods.GET,
        private headers: HttpHeaders = new HttpHeaders(),
        private timeout: number = 30000,
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

export class ConfigLangs {

    constructor(
        private code: string,
        private label: string,
        private url: string,
        private isDefault: boolean
    ) { }
}

export class Config {

    constructor(
        private versioning?: ConfigVersioning[],
        private backend?: BackendConfig,
        private langs?: ConfigLangs[],
        private loggerLevel?: string,
        private devMode?: boolean
    ) { }

}
