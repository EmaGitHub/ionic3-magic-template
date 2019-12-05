import { Component, OnInit } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { NavParams } from 'ionic-angular';
import { Event } from '@app/core/events/models/Event';
import { SplitViewService } from '@app/core/split-view';

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
        private splitViewService: SplitViewService
    ) {}

    ngOnInit() {

        this.event = this.navParams.get('event');

        this.tabBar = <HTMLElement>document.querySelector(".tabbar");
        if (this.tabBar != null) {
          this.tabBar.style.bottom = '-92px';
        }

/*         console.log("nav ",this.splitViewService.getSplitView(0).detailNav.getActive())
 */    }
    
    ionViewWillLeave() {
        
        this.tabBar.style.bottom = '0';
    }
}
