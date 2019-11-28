import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the HorizontalScrollEventsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'horizontal-scroll-events',
  templateUrl: 'horizontal-scroll-events.html'
})
export class HorizontalScrollEventsComponent implements OnInit {

  @Input() title: string = '';

  events: any[] = [];

  constructor() {

  }

  ngAfterViewInit(){
  }

  ngOnInit(){


    switch(this.title){

      case 'DISCOUNT_EVENTS_LABEL': 

        this.events = [{}, {}, {}, {}, {}];
        
        break;

      case 'RECOMMENTED_EVENTS_LABEL':
        console.log("recommmm event label")
        this.events = [{}, {}];
        break;
    }
  }
  
  seeAll(){

  }
}
