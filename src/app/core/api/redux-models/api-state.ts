
export interface ApiCallState {

    requestPending: boolean;
    response: string | null;
    error: string | null;
}

export const initialApiState: ApiCallState = {

    requestPending: false,
    response: null,
    error: null
}