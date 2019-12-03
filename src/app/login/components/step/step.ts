import { Component, Input } from '@angular/core';

/**
 * Generated class for the StepComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'step',
  templateUrl: 'step.html'
})
export class StepComponent {

  @Input() number: string = '';
  @Input() label: string = '';

  constructor() {
  }

}
