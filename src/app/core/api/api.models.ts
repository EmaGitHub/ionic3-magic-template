import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

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

export enum ResponseTypes {
    ARRAY_BUFFER = 'arraybuffer',
    BLOB = 'blob',
    JSON = 'json',
    TEXT = 'text'
}

export class HttpClientOptions {

    constructor(
        public body?: any,
        public headers?: HttpHeaders | {
            [header: string]: string | string[];
        },
        public observe: HttpObserve = 'body',
        public params?: HttpParams | {
            [param: string]: string | string[];
        },
        public reportProgress?: boolean,
        public responseType: ResponseTypes = ResponseTypes.JSON,
        public withCredentials?: boolean
    ) { }
}
