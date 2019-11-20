import { Action } from "@ngrx/store";
import { initialApiState } from "../redux-models/api-state";
import { ApiActionTypes } from "../actions/api-action-types";
import { ApiCallAction } from "../actions/api-call-action";

export function ApiReducer (state: any = initialApiState, action: Action){

    switch(action.type){

        case(ApiActionTypes.REQUEST_SENT):
            console.log("pass on apiReducer case request sent")
            return {...state, requestPending: true};

        case(ApiActionTypes.SUCCESS_RESPONSE_RECEIVED):
            console.log("pass on apiReducer case success response received")
            return {...state, response: (action as ApiCallAction).response, requestPending: false};

        case(ApiActionTypes.FAIL_RESPONSE_RECEIVED):
            console.log("pass on apiReducer case failed ")
            return {...state, error: (action as ApiCallAction).error, requestPending: false};

        default:
            return state;
    }    
}