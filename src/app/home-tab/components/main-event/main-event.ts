import { Component, Input } from '@angular/core';
import { SplitViewService } from '@app/core/split-view';
import { EventDetailPage } from '@app/home-tab/pages/event-detail/event-detail';
import { Event } from '@app/core/models/Event';

/**
 * Generated class for the MainEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-event',
  templateUrl: 'main-event.html'
})
export class MainEventComponent {

  @Input() event?: Event;
  
  constructor(
    private splitViewService: SplitViewService
  ) {
  }

  goEventDetail(){

    this.splitViewService.getSplitView(0).pushOnDetail(EventDetailPage);
  }

}
