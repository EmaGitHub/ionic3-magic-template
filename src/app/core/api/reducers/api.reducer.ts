import { Action } from "@ngrx/store";
import { initialApiState } from "../redux-models/api-state";
import { ApiActionTypes } from "../actions/api-action-types";
import { ApiCallAction } from "../actions/api-call-action";
import { ApiResponseAction } from "../actions/api-response-action";

export function ApiReducer (state: any = initialApiState, action: Action){

    switch(action.type){

        case(ApiActionTypes.REQUEST_SENT):
            console.log("pass on apiReducer case request sent")
            return {...state, requestPending: true, apiName: (action as ApiCallAction).api};

        case(ApiActionTypes.SUCCESS_RESPONSE_RECEIVED):
            console.log("pass on apiReducer case success response received")
            return {...state, response: (action as ApiResponseAction).response, requestPending: false};

        case(ApiActionTypes.FAIL_RESPONSE_RECEIVED):
            console.log("pass on apiReducer case response failed ")
            return {...state, error: (action as ApiResponseAction).error, requestPending: false};

        default:
            return state;
    }    
}