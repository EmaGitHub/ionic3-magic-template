import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { Config } from '@core/config/models';
import { LoggerService } from '@core/logger/logger.service';

@Injectable()
export class HomeService {

    constructor(
        private apiService: ApiService,
        private logger: LoggerService
    ) { }

    recuperaRoba(){
        this.apiService.callApi<Config>('login', {'token' : 'ciaone', 'pippo': 123, 'asd': [1,2,3]}, 'testo', {headers : {'test2': 'ciao'}}).subscribe(
            (res: any) => {
                console.log(res);
            },
            (err: any) => {
                this.logger.error(err);
            }
        );
        this.apiService.request<Config>('/ciao', 'GET', {'token' : 'ciaone', 'pippo': 123, 'asd': [1,2,3]}, 'testo', {headers : {'test2': 'ciao'}}).subscribe(
            (res: any) => {
                console.log(res);
            },
            (err: any) => {
                this.logger.error(err);
            }
        );
    }
}
