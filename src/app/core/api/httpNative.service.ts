import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpNativeProvider {

    request(method: string, url: string, options?: any): Observable<any>{

        return Observable.create()
    };

}