import { Injector } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { TranslatorLang } from './translator.model';
import { TranslatorService } from './translator.service';

export class CustomLoader implements TranslateLoader {

    constructor(
        private injector: Injector
    ){ }

    getTranslation(lang: string): Observable<any> {

        return Observable.create((observer: Observer<any>) => {

            this.injector.get(TranslatorService).downloadLang(lang).then(
                (res: TranslatorLang) => {
                    observer.next(res.translations);
                    observer.complete();
                },
                (err) => {
                    observer.next({});
                    observer.complete();
                }
            )
        });
    }
}
