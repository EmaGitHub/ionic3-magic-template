import { Component } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { SplitViewService } from '@app/core/split-view';
import { DetailPage } from '../detail/detail';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        FadeInOut,
    ]
})
export class HomePage {

    private text: string = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    private visibleText: string = '0';

    constructor(
        private splitViewService: SplitViewService
    ) {

    }

    ngAfterViewInit(){

        setTimeout(() => {
            this.visibleText = '1';
        }, 500);
    }

    goDetail(){

        this.splitViewService.getSplitView(0).pushOnDetail(DetailPage);
    }

}
