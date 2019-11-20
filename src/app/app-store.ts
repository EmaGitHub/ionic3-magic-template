import { UserState } from "./core/user/models/user-state";
import { DeviceState } from "./core/device/models/device-state";
import { ApiCallState } from "./core/api/redux-models/api-state";

export interface AppStore {
  userState: UserState;
  deviceState: DeviceState;
  apiState: ApiCallState
}
