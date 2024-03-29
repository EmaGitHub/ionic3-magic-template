
export interface IEventData {
    url: string;
    scheme: string;
    host: string;
    path: string;
    params: {
        id?: string;
    };
    hash: string;
}
