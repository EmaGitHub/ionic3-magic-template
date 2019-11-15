import { User } from "./User";

export interface UserState {
    error: boolean,
    logged: boolean
    user: User | null
  }


export const initialState: UserState = {
    logged: false,
    error: false,
    user: null
  };