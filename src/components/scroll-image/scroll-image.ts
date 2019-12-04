import { Component } from '@angular/core';

/**
 * Generated class for the ScrollImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll-image',
  templateUrl: 'scroll-image.html'
})
export class ScrollImageComponent {

  text: string;

  constructor() {
    console.log('Hello ScrollImageComponent Component');
    this.text = 'Hello World';
  }

}
