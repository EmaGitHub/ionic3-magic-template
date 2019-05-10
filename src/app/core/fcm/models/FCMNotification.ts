import { TopicTypes } from '@core/fcm';

export interface FCMNotification {
    tap?: boolean;
    type?: TopicTypes;
    title?: string;
    body?: string;
}
