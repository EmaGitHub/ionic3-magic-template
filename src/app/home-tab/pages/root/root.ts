import { Component } from '@angular/core';
import { FadeInOut } from '@app/core/animations';

@Component({
    selector: 'page-root',
    templateUrl: 'root.html',
    animations: [
        FadeInOut,
    ]
})
export class RootPage {

    private text: string = "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    private visibleText: string = '0';

    constructor(
    ) {

    }

    ngAfterViewInit(){

        setTimeout(() => {
            this.visibleText = '1';
        }, 500);
    }

}