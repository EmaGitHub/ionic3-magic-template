import { Component } from '@angular/core';
import { SplitViewService } from '@app/core/split-view';
import { EventDetailPage } from '@app/home-tab/pages/event-detail/event-detail';

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

  constructor(
    private splitViewService: SplitViewService
  ) {
  }

  goEventDetail(){

    this.splitViewService.getSplitView(0).pushOnDetail(EventDetailPage);
  }

}
