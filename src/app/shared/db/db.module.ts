import { NgModule } from '@angular/core';

import { DBService } from './db.service';

@NgModule({
    providers : [
        DBService
    ]
})
export class DBModule { }
