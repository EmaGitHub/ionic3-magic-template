import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@services/api/api.service';

@Injectable()
export class HomeService {

    constructor(
        private apiService: ApiService
    ) { }

    recuperaRoba(){
        const request = this.apiService.request('login', new HttpParams().set('ciao', 'ciaone'), 'test');
    }
}
