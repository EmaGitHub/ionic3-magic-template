import { Injector } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { I18nService } from '../i18n.service';
import { Language } from './Language';

export class CustomTranslateHttpLoader implements TranslateLoader {

    constructor(
        private injector: Injector
    ) { }

    public getTranslation(lang: string): Observable<any> {

        return Observable.create((observer: Observer<any>) => {

            this.injector.get(I18nService).downloadLang(lang).then(
                (res: Language) => {
                    observer.next(res.translations);
                    observer.complete();
                },
                () => {
                    observer.next({});
                    observer.complete();
                }
            )
        });
    }
}
