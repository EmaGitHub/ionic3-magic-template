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
        const request = this.apiService.request<Config>('login', {'token' : 'ciaone'}, 'testo').subscribe(
            res => {
                console.log(res);
            },
            err => {
                this.loggerService.error(err);
            }
        );
    }
}
