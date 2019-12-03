import { Component, Input } from '@angular/core';
import { SplitViewService } from '@app/core/split-view';
import { EventDetailPage } from '@app/home-tab/pages/event-detail/event-detail';
import { Event } from '@app/core/events/models/Event';

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
export class ScrollEventComponent {

  @Input() event?: Event;

  constructor(
    private splitViewService: SplitViewService
  ) {
  }

  goEventDetail(){

    this.splitViewService.getSplitView(0).pushOnDetail(EventDetailPage, {event: this.event});
  }

}
