import { Component } from '@angular/core';
import { SplitViewService } from '@app/core/split-view';
import { DetailPage } from '@app/home-tab/pages/detail/detail';

/**
 * Generated class for the HomeBannerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'home-banner',
  templateUrl: 'home-banner.html'
})
export class HomeBannerComponent {


  constructor(
    private splitViewService: SplitViewService
  ) {
  }

  searchEvent(){

  }

}
