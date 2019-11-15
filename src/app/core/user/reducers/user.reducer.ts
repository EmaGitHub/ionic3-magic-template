import { initialUserState, UserState } from "../models/user-state";
import { LoginAction } from "../actions/login-action";
import { UserActionTypes } from "../actions/user-actions-types";


export function UserReducer(state: any = initialUserState, action: LoginAction): UserState {

  switch (action.type) {
    case UserActionTypes.USER_LOGIN:
      console.log("pass on userReducer case login")
      return {...state, loading: true};

    case UserActionTypes.USER_LOGIN_SUCCESS:
      console.log("pass on userReducer case userLoginSuccess")
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
