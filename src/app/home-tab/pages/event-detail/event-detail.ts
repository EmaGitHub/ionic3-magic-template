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

    friends: any[] = [{name: 'Anna', image: 'person2.png'}, {name: 'Carlo', image: 'person3.png'}, {name: 'Laura', image: 'person4.png'}, {name: 'Gigi', image: 'person5.png'}, {name: 'Franco', image: 'person7.png'}, {name: 'Francesco', image: 'person5.png'}, {name: 'Andrea', image: 'person3.png'}];
    nearEvents: any[] =  [{image: 'camelie.png'}, {image: 'Pisa.png'}, {image: 'bocco.png'}, {image: 'egizi.png'}, {image: 'carnevale.png'}];

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
    }

    getImage(){

        return 'url("assets/imgs/'+this.event!.background+'")';
    }
    
    ionViewWillLeave() {
        
        this.tabBar.style.bottom = '0';
    }
}
