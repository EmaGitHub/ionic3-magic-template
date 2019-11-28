import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello MainEventComponent Component');
    this.text = 'Hello World';
  }

}
