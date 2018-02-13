import { HttpHeaders, HttpParams } from '@angular/common/http';

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
        public headers?: HttpHeaders,
        public observe: string = 'body',
        public params?: HttpParams,
        public reportProgress?: boolean,
        public responseType: ResponseTypes = ResponseTypes.JSON,
        public withCredentials?: boolean
    ) { }
}
