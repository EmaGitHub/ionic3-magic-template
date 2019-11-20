import { Action } from "@ngrx/store";
import { ApiActionTypes } from './api-action-types'

export class ApiCallAction implements Action {

    type: string = ApiActionTypes.REQUEST_SENT;
    response: any;
    error: any

    constructor(public api: any, public options?: any) {}
}