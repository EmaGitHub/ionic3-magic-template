import { Injectable } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { Config } from '@core/config/config.model';
import { LoggerService } from '@core/logger/logger.service';

@Injectable()
export class HomeService {

    constructor(
        private apiService: ApiService,
        private loggerService: LoggerService
    ) { }

    recuperaRoba(){
        this.apiService.request<Config>('login', {'token' : 'ciaone', 'pippo': 123, 'asd': [1,2,3]}, 'testo', {headers : {'test2': 'ciao'}}).subscribe(
            res => {
                console.log(res);
            },
            err => {
                this.loggerService.error(err);
            }
        );
    }
}
