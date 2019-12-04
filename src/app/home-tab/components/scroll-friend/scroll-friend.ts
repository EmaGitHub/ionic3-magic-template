import { Component, Input } from '@angular/core';

/**
 * Generated class for the ScrollEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll-friend',
  templateUrl: 'scroll-friend.html'
})
export class ScrollFriendComponent {

  @Input() friend?: any;

  constructor(
  ) {
  }
}
