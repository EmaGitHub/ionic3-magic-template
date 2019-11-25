import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpClientProvider {

    constructor(
        private httpClient: HttpClient
    ){}

    request(method: string, url: string, options?: any): Observable<any>{

        return this.httpClient.request(method, url, options);
    };

}