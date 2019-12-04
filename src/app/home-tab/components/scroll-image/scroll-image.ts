import { Component, Input } from '@angular/core';

/**
 * Generated class for the ScrollEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll-image',
  templateUrl: 'scroll-image.html'
})
export class ScrollImageComponent {

  @Input() nearEvent?: any;

  constructor(
  ) {
  }
}
