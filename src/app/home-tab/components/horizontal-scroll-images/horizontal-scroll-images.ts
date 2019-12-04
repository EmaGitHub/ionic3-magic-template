import { Component, Input, OnInit } from '@angular/core';


/**
 * Generated class for the HorizontalScrollEventsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'horizontal-scroll-images',
  templateUrl: 'horizontal-scroll-images.html'
})
export class HorizontalScrollImagesComponent implements OnInit {

  @Input() nearEvents?: any[];


  constructor(

  ) {

  }

  ngAfterViewInit(){
  }

  ngOnInit(){


    }

}
