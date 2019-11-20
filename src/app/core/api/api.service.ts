import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { HttpObserve } from '@angular/common/http/src/client';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Api } from './models/Api';
import { Backend } from './models/Backend';
import { HttpClientOptions } from './models/HttpClientOptions';
import { ResponseTypes } from './models/ResponseTypes';
import { IHttpService } from './http.interface';
import { DeviceService } from '../device';
import { HttpClientProvider } from './httpClient.service';
import { HttpNativeProvider } from './httpNative.service';

@Injectable()
export class ApiService {

    private _backend: Backend|null = null;
    private _http?: IHttpService;

    constructor(
        private deviceService: DeviceService,
        private injector: Injector
    ) {
        if(!this.deviceService.isIos()) this._http = this.injector.get(HttpClientProvider);
        else this._http = this.injector.get(HttpNativeProvider);
     }

    /**
     * Init the Api Service with configuration fetched from config file
     * @param backend Beckend configuration for Api Service
     */
    public init(backend: Backend) : void {
        this._backend = new Backend(backend);
    }

    /**
     * Create a new request with dynamic method, params, body, headers.
     * Create a new Api instance from given api name setting method, url, headers and timeout directly from config.json file.
     * After that add/set HTTP query params, body (for POST, PUT, PATCH requests), and HTTP headers.
     * @param  {string} api Property name of Api class
     * @param  {object={}} params HTTP query params to use in all request
     * @param  {object={}} paths HTTP path params to use in all request
     * @param  {any=null} body HTTP body for a POST, PUT or PATCH request
     * @param  {object={}} headers? HTTP header to add to request
     * @param  {ResposeTypes} responseType? HTTP response type for request
     * @returns Promise
     */
    public callApi<T>(
        apiName: string,
        options: {
			params?: {};
			paths?: {};
			body?: any;
            headers?: {};
            observe? : HttpObserve;
			responseType?: ResponseTypes;
		} = {}
    ): Observable<T> {
        // Use getApi in configService to define all options for api
        let api = Object.assign({},(this._backend as Backend).getApi(apiName));

        if (api) {
            // Set the request's url
            api.url = this._prepareUrl(api.url, options.paths);

            let httpClientOptions = this._prepareOptions(api, options);

 
            return this.call(api, httpClientOptions);
        }
        else {
            return new ErrorObservable(new Error(`API ${apiName} is not configured`));
        }
    }

    /**
     * Build a url of api from the global configuration
     * of model and optionaly the pass params
     * @param {string} url a api url
     * @param {object={}} paths a path params
     * @return {string} api's url
     */
    private _prepareUrl(url: string, paths?: {}): string {
        return paths && Object.keys(paths).length
            ? this._bindPathParams(url, paths)
            : url;
    }

    /**
     * Bind a path param name with the pass value
     * @param {string} url request url to replace
     * @param {object={}} paths object key => val
     * @return {string}
     */
    private _bindPathParams(url: string, params: {[key: string]: any }): string {
        for (const key in params) {
            url = url.replace(new RegExp(`{${key}}`, 'g'), params[key]);
        }
        return url;
    }

    private _prepareOptions(
        api: Api,
        options: {
			params?: {};
			body?: any;
            headers?: {};
            observe? : HttpObserve;
			responseType?: ResponseTypes;
		} = {}
    ): HttpClientOptions {

        // Create a new HttpRequest base on API method
        let httpClientOptions = new  HttpClientOptions();

        // Add all requested HttpParams
        if (!options.params) {
            options.params = {};
        }
        let queryParams = new HttpParams();
        for (let qKey in options.params) {
            queryParams = queryParams.set(qKey, (options.params as any)[qKey]);
        }
        httpClientOptions.params = queryParams;

        // Add all requested HttpHeaders
        if (options.headers) {
            // add a fake header to duplicate the headers
            let headers = (api.headers as HttpHeaders).set('fake_header_for_cloning', '');
            for (let hKey in options.headers) {
                headers = headers.set(hKey, (options as any).headers[hKey]);
            }
            // remove the fake header
            headers = headers.delete('fake_header_for_cloning');
            httpClientOptions.headers = headers;
        }
        else {
            httpClientOptions.headers = api.headers;
        }

        httpClientOptions.body = options.body;
        httpClientOptions.observe = options.observe || 'body';
        httpClientOptions.responseType = options.responseType || ResponseTypes.JSON;

        return httpClientOptions;
    }

    /**
     * Make the HTTP request with the prepared Api and options
     * @param  {Api} api
     * @param  {HttpClientOptions} options
     * @returns Observable
     */
    public call<T>(api: Api, httpClientOptions: HttpClientOptions): Observable<T> {
        return this._http!.request(api.method, api.url, httpClientOptions)
            .map(res => this._handleSuccess(res))
            .catch(res => this._handleError(res));
    }

    private _handleSuccess(response: any): any {
        return response;
    }

    private _handleError(response: HttpErrorResponse): Promise<HttpErrorResponse> {
        return Promise.reject(response);
    }
}
