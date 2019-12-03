export interface EventsState{

    eventsUpdated: boolean
    oldEvents: boolean
}

export const initialEventsState: EventsState = {

    eventsUpdated: false,
    oldEvents: false
}