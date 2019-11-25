import { UserActionTypes } from "./user-actions-types";
import { Action } from "@ngrx/store";
import { User } from "../models/User";

export class LoginAction implements Action {
    type = UserActionTypes.USER_LOGIN;
    user!: User;
  
    constructor(public email:string, public password:string) {}
    
  }