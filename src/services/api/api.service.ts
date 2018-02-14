import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Injectable } from '@angular/core';
import { ApiConfig } from '@services/config/config.model';
import { ConfigService } from '@services/config/config.service';
import { Observable } from 'rxjs/Observable';

import { HttpClientOptions } from './api.models';

@Injectable()
export class ApiService {

    constructor(
        private configService: ConfigService,
        private http: HttpClient
    ) {

    }


    /**
     * Create a new request with dynamic method, params, body, headers, observer.
     * Create a new ApiConfig instance from given api name settings method, url, headers and timeout directly from config.json file.
     * After that add/set HTTP query params, body (for POST, PUT, PATCH requests), HTTP headers, and the HTTP observer.
     * Make the request and return the Observable
     * @param  {string} api Property name of ApiConfig class
     * @param  {object={}} params HTTP query params to use in all request
     * @param  {any=null} body HTTP body for POST, PUT or PATCH requests
     * @param  {observe?:HttpObserve} options.observe? HttpObserve type
     * @param  {object={}} options.headers? HTTP header to add to request
     * @returns Observable
     */
    request<T>(api: string, params: object = {}, body: any = null, options: {observe? : HttpObserve, headers?: object} = {}): Observable<T> {
        // Use getApiConfig in configService to define all options for api
        let apiConfig = <ApiConfig>this.configService.getApiConfig(api);

        // Add all requested HttpParams
        let queryParams = new HttpParams();
        for(let qKey in params){
            queryParams = queryParams.set(qKey, (<any>params)[qKey]);
        }

        // Add all requested HttpHeaders
        let headers = new HttpHeaders();
        if(options.headers){
            // add a fake header to duplicate the headers
            headers = apiConfig.headers.set('fake_header_for_cloning', '');
            for (let hKey in options.headers){
                headers = headers.set(hKey, (<any>options).headers[hKey]);
            }
            // remove the fake header
            headers = headers.delete('fake_header_for_cloning');
        }



        // Create a new HttpRequest base on API method
        let httpClientOptions = new  HttpClientOptions();
        httpClientOptions.body = body;
        httpClientOptions.headers = headers;
        httpClientOptions.params = queryParams;
        httpClientOptions.observe = options.observe || 'body';
        // httpClientOptions.responseType = apiConfig.responseType;

        return this.http.request(apiConfig.method, apiConfig.url, httpClientOptions)
            .map(res => this.handleSuccess(res))
            .catch(res => this.handleError(res));
    }

    private handleSuccess(response: any) {
        return response;
    }

    private handleError(response: HttpErrorResponse) {
        // const error = new Error("Impossibile eseguire l'operazione richiesta. Contattare l'amministratore di sistema se il problema persiste.");
        return Promise.reject(response);
    }
}
