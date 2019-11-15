import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Actions, Effect } from "@ngrx/effects";
import { UserService } from './user.service';
import { UserActionTypes } from "./actions/user-actions-types";

@Injectable()
export class UserEffects {

  constructor(private actions: Actions,
              private userService: UserService) {
  }

  @Effect()

  login = this.actions.ofType(UserActionTypes.USER_LOGIN)
      .map( (action: any) => action)
      .switchMap((action: any) => this.userService.login(action.email, action.password)
      .then((response: any) => ({ type: UserActionTypes.USER_LOGIN_SUCCESS, user: response}))
      .catch(() => Observable.of({ type: UserActionTypes.USER_LOGIN_ERROR }))
    );
    
}
