import { Component, OnInit } from '@angular/core';
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
export class EventDetailPage implements OnInit {

    event?: Event;
    tabBar: any;

    friends: any[] = [{}, {}, {}, {}, {}, {}, {}];
    nearEvents: any[] =  [{}, {}, {}, {}, {}];

    constructor(
        private navParams: NavParams,
    ) {}

    ngOnInit() {

        this.event = this.navParams.get('event');

        this.tabBar = <HTMLElement>document.querySelector(".tabbar");
        if (this.tabBar != null) {
          this.tabBar.style.bottom = '-56px';
        }
    }
    
    ionViewWillLeave() {
        
        this.tabBar.style.bottom = '0';
    }
}
