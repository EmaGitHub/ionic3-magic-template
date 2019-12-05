import { Component } from '@angular/core';

/**
 * Generated class for the EventsAroundComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'events-around',
  templateUrl: 'events-around.html'
})
export class EventsAroundComponent {

  text: string;

  constructor() {
    console.log('Hello EventsAroundComponent Component');
    this.text = 'Hello World';
  }

}
