import { HttpParams } from '@angular/common/http/src/params';
import { Injectable } from '@angular/core';
import { ApiConfig } from '@services/config/config.model';
import { ConfigService } from '@services/config/config.service';
import { HttpService } from '@services/http/http.service';

@Injectable()
export class ApiService {
    private token: string;

    constructor(
        private configService: ConfigService,
        private httpService: HttpService
    ) {

    }

    request(api: string, params?: HttpParams, body?: any){
        let apiConfig = <ApiConfig>this.configService.getApiConfig(api);

    }


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

//     getAPIBaseUrl() {
//         let serviceUrl = Config.getAPIServiceUrl();
//         return `${this._session.instance_url}/${serviceUrl}`;
//     }

//     getAccessToken() {
//         return this._session.access_token;
//     }

//     call(options) {
//         const request = axios(options);
//         return request.then(
//             response => this._handleSuccess(response),
//             err => this._handleError(err));
//     }

//     prepareOauth() {
//         const environment = Config.getOauthEnvironment();
//         let oauthData = this._oauth[environment];
//         let data = {
//             username      : CryptoJS.AES.decrypt(oauthData.integrationUser.username, decryptKey).toString(CryptoJS.enc.Utf8),
//             password      : CryptoJS.AES.decrypt(oauthData.integrationUser.password, decryptKey).toString(CryptoJS.enc.Utf8),
//             client_id     : CryptoJS.AES.decrypt(oauthData.integrationUser.client_id, decryptKey).toString(CryptoJS.enc.Utf8),
//             client_secret : CryptoJS.AES.decrypt(oauthData.integrationUser.client_secret, decryptKey).toString(CryptoJS.enc.Utf8),
//             grant_type    : 'password'
//         };
//         let options = {
//             url     : `${this._prepareUrl(oauthData.url)}`,
//             method  : oauthData.method,
//             headers : {
//                 'Content-Type' : oauthData.contentType
//             },
//             timeout : oauthData.timeout,
//             // data    : Object.keys(data).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
//             data    : window.Dom7.serializeObject(data)
//         };
//         return options;
//     }

//     /**
//      * Autenticazione connessione Oauth verso SFDC
//      */
//     authOnSDFC() {
//         // Preparo la richiesta di Oauth
//         let options = this.prepareOauth();
//         try {
//             const request = axios(options);
//             return request.then(
//                 response => this._handleSuccess(response),
//                 err => this._handleError(err)).then(
//                 s => this.setSessionParams(s)
//             );
//         }
//         catch (e) {
//             Logger.error(e);
//             return this.handleAPIError('oauth');
//         }
//     }

//     resetOauthSession() {
//         this._session = {};
//         Storage.setLastSession(this._session);
//     }

//     setSessionParams(responseSession) {
//         // Ricevute le credenziali di sessione aggiorno quelle del servizio
//         // e ne salvo una copia nel localStorage (da decidere se lasciare o rimuovere in prod)
//         this._session = {
//             access_token : responseSession.access_token,
//             id           : responseSession.id,
//             instance_url : responseSession.instance_url,
//             issued_at    : responseSession.issued_at,
//             signature    : responseSession.signature,
//             token_type   : responseSession.token_type
//         };
//         Storage.setLastSession(this._session);
//     }
// }

// export default new MagicWandApi();

