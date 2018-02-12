import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient
    ) {

    }

    // request(url: string, method: keyof typeof RequestMethods, body?: Object, queryParams?: any, pathParams?: any[]) {

    //     const headers: Headers = this.headersManager(method);

    //     const requestOptions = new RequestOptions({
    //         url: this.getCurrentEndPoint(url, pathParams || []),
    //         method: method,
    //         headers: headers
    //     });

    //     if (body) {
    //         requestOptions.body = body;
    //     }

    //     if (queryParams) {
    //         requestOptions.params = queryParams;
    //     }

    //     const request = new Request(requestOptions);

    //     return this.http.request(request)
    //     .map((res: Response) => res.json())
    //     .catch((res: Response) => this.onRequestError(res));
    // }
}



//     /**
//      * Handle della chiamata HTTP in caso di successo
//      * @param {Object} response - Response della chiamata con successo
//      * @returns {Object} `body` dell'oggetto $http
//      * @private
//      */
//     _handleSuccess(response) {
//         if (response && response.status) {
//             // Se l'API contiente uno status lo valuto ed eventualmente ritorno un errore
//             if (response.status === 'OK') {
//                 return Promise.resolve(response);
//             }
//             else if (response.status === 'KO') {
//                 return this._handleError(new Error(response.errorCode));
//                 // return this._handleError(new Error(response.errorMessage));
//             }
//         }
//         return Promise.resolve(response);
//     }

//     /**
//      * Handle della chiamata HTTP in caso d'errore
//      * @param {Object} error - Errore della chiamata fallita
//      * @returns {Object} Oggetto d'errore così come lo ha parsato l'interceptor
//      * @private
//      */
//     _handleError(error) {
//         if (error && error.status === 'OFFLINE') {
//             return Promise.resolve({});
//         }
//         else {
//             return Promise.reject(error);
//         }
//     }

//     /**
//      * Handle che gestisce l'errore per API non configurata
//      * @param {String} apiName - Nome dell'API da utilizzare
//      * @returns {Object} Oggetto d'errore
//      * @private
//      */
//     handleAPIError(apiName) {
//         Logger.error(`API ${apiName} error`);
//         return Promise.reject(new Error(`Service ${apiName} not configured properly`));
//     }

//     /**
//      * Funzione che inizializza i parametri della request HTTP leggendo dal file di configurazione
//      * @param {String} apiName - Nome dell'API da configurare
//      * @returns {Object}
//      * @private
//      */
//     prepareRequest(apiName) {
//         let api = Config.getAPIDefinitions();

//         let options = {
//             url     : `${this._prepareUrl(api[apiName].url)}`,
//             method  : api[apiName].method,
//             headers : {
//                 'Content-Type' : api[apiName].contentType
//             },
//             timeout : api[apiName].timeout
//         };
//         return options;
//     }

//     _prepareUrl(url) {
//         if (url.trim().indexOf('http') !== 0 && url.trim()[0] !== '.') {
//             let baseUrl = this.getAPIBaseUrl();
//             url = (baseUrl + url).trim();
//         }
//         return url;
//     }

//     call(options) {
//         const request = axios(options);
//         return request.then(
//             response => this._handleSuccess(response),
//             err => this._handleError(err));
//     }
// }


