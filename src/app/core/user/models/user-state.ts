import { User } from "./User";

export interface UserState {
    loading: boolean
    logged: boolean
    error: boolean
    user: User | null
    ateneo: string
  }


export const initialUserState: UserState = {
    loading: false,
    logged: false,
    error: false,
    user: null,
    ateneo: ''
  };