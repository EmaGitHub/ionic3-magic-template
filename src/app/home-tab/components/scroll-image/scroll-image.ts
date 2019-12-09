import { Component, Input, OnInit } from '@angular/core';

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
export class ScrollImageComponent implements OnInit{

  @Input() nearEvent?: any;

  nearEventImage: string = '';

  constructor(
  ) {
  }

  ngOnInit() {
    
    this.nearEventImage = 'assets/imgs/'+this.nearEvent!.image;
  }
}
