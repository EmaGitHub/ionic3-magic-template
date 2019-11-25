import { Component } from '@angular/core';
import { AppNotification, TopicTypes } from '@core/fcm';
import { LoggerService } from '@core/logger/logger.service';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'popover-push',
    templateUrl: 'popover-push.html',
})
export class PopoverPush {
    public notification: AppNotification;
    public icon: string = 'home';
    public title: string = 'title';
    public message: string = 'Push test message';
    public onOpen: Function;

    constructor(
        private logger: LoggerService,
        private navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        this.notification = this.navParams.data.notification as AppNotification;
        this.title = this.notification.title = '';
        this.message = this.notification.body = '';

        switch (this.notification.type) {
        case TopicTypes.INFO_SEC:
            this.icon = 'warning';
            break;
        case TopicTypes.AGENDA:
        case TopicTypes.MEETING_UPDATED:
        case TopicTypes.MEETING_CANCELLED:
            this.icon = 'euc-calendar';
            break;
        }
        this.onOpen = this.navParams.data.onOpen;
    }

    /**
     * Open push and execute its onOpen function
     */
    public openPush(): void {
        this.logger.debug('PopoverPush:openPush');
        this.onOpen();
        setTimeout(() => {
            this.closePush();
        }, 500);
    }

    /**
     * Simply close the popover
     */
    public closePush(): void {
        this.logger.debug('PopoverPush:closePush');
        this.viewCtrl.dismiss();
    }

}
