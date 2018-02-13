import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '@services/config/config.model';
import { ConfigService } from '@services/config/config.service';
import { Observable } from 'rxjs/Observable';

import { HttpClientOptions } from './api.models';

@Injectable()
export class ApiService {
    private token: string;

    constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {

    }

    request<T>(api: string, params: object = {}, body: any = null, options: {observe? : string} = {}): Observable<T> {
        // Use getApiConfig in configService to define all options for api
        let apiConfig = <ApiConfig>this.configService.getApiConfig(api);

        // Add all requested HttpParams
        let queryParams = new HttpParams();
        for(let key in queryParams){
            queryParams.set(key, params[key]);
        }

        // Create a new HttpRequest base on API method
        let httpClientOptions = new  HttpClientOptions();
        httpClientOptions.body = body;
        httpClientOptions.headers = apiConfig.headers;
        httpClientOptions.params = queryParams;
        httpClientOptions.observe = options.observe || 'body';
        // httpClientOptions.responseType = apiConfig.responseType;

        return this.http.request(apiConfig.method, apiConfig.url, <any>httpClientOptions)
            .map(res => this.handleSuccess(res))
            .catch(res => this.handleError(res));
    }

    private handleSuccess(response: any) {
        return response;
    }

    private handleError(response: HttpErrorResponse) {
        const error = new Error("Impossibile eseguire l'operazione richiesta. Contattare l'amministratore di sistema se il problema persiste.");
        return Promise.reject(error);
    }
}
