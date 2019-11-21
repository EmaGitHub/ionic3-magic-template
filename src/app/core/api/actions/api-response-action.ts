import { Action } from "@ngrx/store";

export class ApiResponseAction implements Action {
    
    type!: string;
    response: any | null;
    error: any | null;
}