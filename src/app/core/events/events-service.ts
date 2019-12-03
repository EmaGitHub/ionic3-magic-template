import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClientProvider } from "../api/clients/httpClient.service";

@Injectable()
export class EventsService{

    constructor(
        private httpClient: HttpClientProvider,
    ){}

    getEvents(): Observable<any>{

        return this.httpClient.request('get', 'assets/data/events.json')
    }
}

