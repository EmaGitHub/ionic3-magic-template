import { Component, OnInit, OnDestroy } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { NavParams } from 'ionic-angular';
import { Event } from '@app/core/events/models/Event';

@Component({
    selector: 'page-event-detail',
    templateUrl: 'event-detail.html',
    animations: [
        FadeInOut,
    ]
})
export class EventDetailPage implements OnInit, OnDestroy {

    private event?: Event;

    constructor(
        private navParams: NavParams
    ) {}

    ngOnInit() {

        this.event = this.navParams.get('event');
    }

    ngOnDestroy(){
        console.log("ngOnDestroy");
    }

}
