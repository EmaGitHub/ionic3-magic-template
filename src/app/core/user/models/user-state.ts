import { User } from "./User";

export interface UserState {
    loading: boolean,
    error: boolean,
    logged: boolean
    user: User | null
  }