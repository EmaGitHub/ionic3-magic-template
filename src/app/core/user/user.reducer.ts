import {Action} from "@ngrx/store";
import { User } from "./models/User";
import { UserState, initialState } from "./models/user-state";
import { UserActionTypes } from "./actions/user-actions-types";
import { LoginAction } from "./actions/login-action";

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

    case UserActionTypes.USER_LOGOUT:
        console.log("pass on userReducer case userLogoutSuccess")
        return {...state, loading: false, logged: false};

    default:
      return state;
  }
}
