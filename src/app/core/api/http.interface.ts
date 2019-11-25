import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class IHttpService {

    abstract request(method: string, url: string, options?: any): Observable<any>;

}