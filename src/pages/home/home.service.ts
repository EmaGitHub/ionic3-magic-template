import { Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';
import { Config } from '@services/config/config.model';
import { LoggerService } from '@services/logger/logger.service';

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
