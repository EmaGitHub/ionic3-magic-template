import { FCMNotification } from '@core/fcm';

export interface AppNotification extends FCMNotification {
    data?: string;
}
