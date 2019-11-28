import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello ScrollEventComponent Component');
    this.text = 'Hello World';
  }

}
