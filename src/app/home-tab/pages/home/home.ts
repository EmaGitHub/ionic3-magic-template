import { Component } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { SplitViewService } from '@app/core/split-view';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        FadeInOut,
    ]
})
export class HomePage {

    private visibleText: string = '0';

    constructor(
        private splitViewService: SplitViewService
    ) {

    }

    ngAfterViewInit(){

        
    }

    ionViewWillEnter(){
        
        // your code to initialize
        setTimeout(() => {
            this.visibleText = '1';
        }, 500);
     }


}
