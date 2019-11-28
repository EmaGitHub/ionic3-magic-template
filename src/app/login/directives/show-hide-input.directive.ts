import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[show-hide-input]'
})
export class ShowHideInput{

    @Input() hide: boolean = true;

    constructor(private el: ElementRef) {
    }

    ngAfterViewInit(){

      this.changeType('password')
    }

    ngOnChanges(changes: SimpleChanges) {

      if(changes.hide.previousValue != null){

        if(changes.hide.currentValue == true)
            this.changeType('password')
        else 
            this.changeType('text')
      }
      
    }

    changeType(type: string) {  // in your case function name is type
      this.el.nativeElement.children[0].type = type; // change type for input inside the ion-input
  }

}