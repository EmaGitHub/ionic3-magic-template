import { UserState } from "./core/user/models/user-state";
import { DeviceState } from "./core/device/models/device-state";

export interface AppStore {
  userState: UserState;
  deviceState: DeviceState
}
