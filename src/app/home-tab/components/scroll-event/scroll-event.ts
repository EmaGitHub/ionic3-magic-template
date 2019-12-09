import { Component, Input, OnInit } from '@angular/core';
import { SplitViewService } from '@app/core/split-view';
import { EventDetailPage } from '@app/home-tab/pages/event-detail/event-detail';
import { Event } from '@app/core/events/models/Event';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the ScrollEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll-event',
  templateUrl: 'scroll-event.html'
})
export class ScrollEventComponent implements OnInit{

  @Input() event?: Event;

  pictureUrl: string= '';
  iconName: string= '';

  constructor(
    private splitViewService: SplitViewService
  ) {

  }

  ngOnInit(){

    this.initImage();
    this.initIcon();
  }

  goEventDetail(){

    this.splitViewService.getSplitView(0).pushOnDetail(EventDetailPage, {event: this.event});
  }

  initImage(){

    this.pictureUrl =  "assets/imgs/"+this.event!.background;
  }
  initIcon(){

    if(this.event!.type == "MOSTRA") this.iconName = 'custom-mostre';
    else this.iconName = 'custom-teatri';
  }
  

}
