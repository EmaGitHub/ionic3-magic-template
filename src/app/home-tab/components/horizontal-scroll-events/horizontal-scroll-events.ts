import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@app/core/models/Event';

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

  events: Partial<Event>[] = [];

  constructor() {

  }

  ngAfterViewInit(){
  }

  ngOnInit(){


    switch(this.title){

      case 'DISCOUNT_EVENTS_LABEL': 

        this.events = [{title: 'Antiche Camelie', type: 'MOSTRA'}, {title: 'Carnevale di Bocco', type: 'SPETTACOLO'}, {title: 'Antichi egizi', type: 'MOSTRA'}, {title: 'Assedio alla Villa', type: 'SPETTACOLO'}, {title: 'Futuro e tecnologia', type: 'MOSTRA'}];
        break;

      case 'RECOMMENTED_EVENTS_LABEL':

      this.events = [{title: 'Assedio alla Villa', type: 'SPETTACOLO'}, {title: 'Futuro e tecnologia', type: 'MOSTRA'}];
        break;
    }
  }
  
  seeAll(){

  }
}
