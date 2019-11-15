import {Action} from "@ngrx/store";
import { User } from "./models/User";
import { UserState } from "./models/user-state";

export const UserActionTypes = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR: 'USER_LOGIN_ERROR',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',
};

const initialState: UserState = {
  loading: false,
  logged: false,
  error: false,
  user: null
};

export class LoginAction implements Action {
  type = UserActionTypes.USER_LOGIN;
  user!: User;

  constructor(public email:string, public password:string) {}
  
}

export function userReducer(state: any = initialState, action: LoginAction): UserState {

  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      console.log("pass on userReducer case login")
      return {...state, loading: true};

    case UserActionTypes.USER_LOGIN_SUCCESS:
      console.log("pass on userReducer case userLoginSuccess con action ",JSON.stringify(action))
      return {...state, user: action.user, loading: false, logged: true};

    case UserActionTypes.USER_LOGIN_ERROR:
      console.log("pass on userReducer case error")
      return {...state, loading: false, error: true};

    case UserActionTypes.USER_LOGOUT_SUCCESS:
        console.log("pass on userReducer case userLogoutSuccess")
        return {...state, loading: false, logged: false};

    default:
      return state;
  }
}
