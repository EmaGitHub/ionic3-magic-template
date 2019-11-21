import { Component, OnInit } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { ApiService, Backend } from '@app/core/api';
import { AppStore } from '@app/app-store';
import { Store } from '@ngrx/store';
import { ApiCallAction } from '@app/core/api/actions/api-call-action';
import { Subscription } from 'rxjs';
import { ApiCallState } from '@app/core/api/redux-models/api-state';

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
    animations: [
        FadeInOut,
    ]
})
export class DetailPage implements OnInit {

    private text: string = " similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    private visibleText: string = '0';
    public getResp: any[] = [];
    public postResp: any = null;

    private apiStateSubscription$?: Subscription;

    constructor(
        private store: Store<AppStore>
    ) {}

    ngOnInit() {

        this.apiStateSubscription$ = this.store.select('apiState').subscribe((state: ApiCallState) => {
           
            if (state.requestPending == false && state.error==null){

                if (state.apiName == 'get1') this.getResp = state.response
                if (state.apiName == 'post') this.postResp = JSON.stringify(state.response)
            }
        })
    }

    ngAfterViewInit(){

        setTimeout(() => {
            this.visibleText = '1';
        }, 500);
    }

    makeGetReq() {

        this.store.dispatch(new ApiCallAction('get1', {}));
    }

    makePostReq() {

        this.store.dispatch(new ApiCallAction('post', {body: {id: 1, title: 'title', userId: '63'}}));

    }

}
