import { initialUserState, UserState } from "../models/user-state";
import { LoginAction } from "../actions/login-action";
import { UserActionTypes } from "../actions/user-actions-types";
import { Action } from "@ngrx/store";
import { AteneoAction } from "../actions/ateneo-action";


export function UserReducer(state: any = initialUserState, action: Action): UserState {

  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      console.log("pass on userReducer case login")
      return {...state, loading: true};

    case UserActionTypes.USER_LOGIN_SUCCESS:
      console.log("pass on userReducer case userLoginSuccess")
      return {...state, user: (action as LoginAction).user, loading: false, logged: true};

    case UserActionTypes.USER_LOGIN_ERROR:
      console.log("pass on userReducer case error")
      return {...state, loading: false, error: true};

    case UserActionTypes.USER_LOGOUT:
        console.log("pass on userReducer case userLogoutSuccess")
        return {...state, loading: false, logged: false};

    case UserActionTypes.EDIT_ATENEO:
        console.log("pass on userReducer case edit Ateneo ",(action as AteneoAction).ateneo ) 
        return {...state, ateneo: (action as AteneoAction).ateneo};

    default:
      return state;
  }
}
