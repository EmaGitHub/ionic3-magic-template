import { UserState } from "./core/user/models/user-state";
import { DeviceState } from "./core/device/models/device-state";
import { ApiCallState } from "./core/api/redux-models/api-state";
import { EventsState } from "./core/events/models/EVENTS-state";

export interface AppStore {
  userState: UserState;
  deviceState: DeviceState;
  apiState: ApiCallState
  eventsState: EventsState
}
