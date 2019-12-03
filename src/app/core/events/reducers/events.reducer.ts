import { Action } from "@ngrx/store";
import { EventsState, initialEventsState } from "../models/EVENTS-state";
import { EventsActionTypes } from "../actions/events-action-types";

export function EventsReducer(state: EventsState = initialEventsState, action: Action){

    switch(action.type){

        case EventsActionTypes.EVENTS_UPDATED:
            return {...state, eventsUpdated: true, oldEvents: false};

        case EventsActionTypes.OLD_EVENTS_LOADED:    
            return {...state, eventsUpdated: false, oldEvents: true};

        default: 
            return state;
    }
}