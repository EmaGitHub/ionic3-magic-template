
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

// export class ApiOptions {
//     private headers?: HttpHeaders;
//     reportProgress?: boolean;
//     params?: HttpParams;

//     withCredentials?: boolean;
// }

export class ApiConfig<T> {
    // constructor(
    //     private url: string,
    //     private method: string = HttpMethods.GET,
    //     private responseType: string = ResponseTypes.JSON,
    //     private headers: object = {},
    // ) {
    //     if (!this.headers.contentType) {
    //         this.headers.contentType = 'application/json'
    //     }
    //     if (!this.headers.timeout) {
    //         this.headers.timeout = '30000'
    //     }
    // }
}
