import 'rxjs/add/operator/takeUntil';

import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export class AutoUnsubscribe implements OnDestroy {
    public destroy$: Subject<boolean> = new Subject<boolean>();

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
