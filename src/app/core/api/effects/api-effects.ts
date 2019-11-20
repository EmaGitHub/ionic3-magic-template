import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ApiActionTypes } from "../actions/api-action-types";
import { ApiService } from "../api.service";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class ApiEffects{

    constructor(
                private actions: Actions,
                private apiService: ApiService){}

    @Effect()
    apiCall = this.actions.ofType(ApiActionTypes.REQUEST_SENT)
        .switchMap((action: any) => this.apiService.callApi(action.api, action.options) )
        .pipe(
            map(apiResponse => ({ type: ApiActionTypes.SUCCESS_RESPONSE_RECEIVED, response: apiResponse})),
            catchError(error => of({ type: ApiActionTypes.FAIL_RESPONSE_RECEIVED, error: error })))
}
