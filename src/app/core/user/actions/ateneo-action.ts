import { UserActionTypes } from "./user-actions-types";
import { Action } from "@ngrx/store";

export class AteneoAction implements Action {
    type = UserActionTypes.EDIT_ATENEO;
  
    constructor(public ateneo:string) {}
    
  }