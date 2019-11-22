
export interface ApiCallState {

    apiName: string[];
    requestPending: boolean;
    response: any | null;
    error: any | null;
}

export const initialApiState: ApiCallState = {

    apiName: [],
    requestPending: false,
    response: null,
    error: null
}