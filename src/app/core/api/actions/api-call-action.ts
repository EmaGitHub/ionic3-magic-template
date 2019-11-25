import { Action } from "@ngrx/store";
import { ApiActionTypes } from './api-action-types'

export class ApiCallAction implements Action {

    type: string = ApiActionTypes.REQUEST_SENT;

    constructor(public apiName: any, public options?: any) {}
}