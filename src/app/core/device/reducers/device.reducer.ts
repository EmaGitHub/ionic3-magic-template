import { DeviceState, initialDeviceState } from "../models/device-state";
import { Action } from "@ngrx/store";
import { DeviceActionTypes } from '../actions/device-action-types';

export function DeviceReducer(state: DeviceState = initialDeviceState, action: Action){

    switch(action.type){

        case DeviceActionTypes.DEVICE_IS_SMARTPHONE:
            return {...state, deviceType: 'smartphone'};

        case DeviceActionTypes.DEVICE_IS_TABLET:    
            return {...state, deviceType: 'tablet'};

        default: 
            return state;
    }
}