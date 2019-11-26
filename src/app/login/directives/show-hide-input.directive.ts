import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[show-hide-input]'
})
export class ShowHideInput {

    @Input('appTargetInput') targetInput: any;

    constructor(el: ElementRef) {
    }
  
    @HostListener('click') onMouseEnter() {
      let inType = (this.targetInput._native.nativeElement.type == 'text')? 'password': 'text';
      this.targetInput._native.nativeElement.type = inType;
  }

}