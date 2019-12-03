import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@app/core/events/models/Event';
import { LokiDatabaseService } from '@app/core/lokijs-database/LokiDBService';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/app-store';
import { EventsState } from '@app/core/events/models/EVENTS-state';

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

  private eventsSubscription$?: Store<EventsState>

  constructor(
    private lokiDBServie: LokiDatabaseService,
    private store: Store<AppStore>
  ) {

    //this.initEventsSubscription();
  }

  ngAfterViewInit(){
  }

  ngOnInit(){


    switch(this.title){

      case 'DISCOUNT_EVENTS_LABEL': 

        
        //console.log("Discounted events ",this.lokiDBServie.getEventsFromDB().find({'discountedPrice': {'$gte': 0}}));
        this.events = [{shortTitle: 'Carnevale di Bocco', type: 'SPETTACOLO', title: 'Carnivale dei Figli di Bocco'}, {shortTitle: 'Antiche Camelie', type: 'MOSTRA', title: 'Mostra sulle Antiche Camelie'}, {shortTitle: 'Carnevale di Bocco', type: 'SPETTACOLO'}, {shortTitle: 'Antichi egizi', type: 'MOSTRA'}, {shortTitle: 'Assedio alla Villa', type: 'SPETTACOLO'}, {shortTitle: 'Futuro e tecnologia', type: 'MOSTRA'}];
        break;

      case 'RECOMMENTED_EVENTS_LABEL':

      this.events = [{shortTitle: 'Assedio alla Villa', type: 'SPETTACOLO'}, {shortTitle: 'Futuro e tecnologia', type: 'MOSTRA'}];
        break;
    }
  }
  
  seeAll(){

  }

  /* public initEventsSubscription() {

    this.eventsSubscription$ = this.store.select('eventsState');
    this.eventsSubscription$.subscribe((state: EventsState) => {

        if(state.eventsUpdated == true) {
          
          console.log("Discounted events ",(this.lokiDBServie.getEventsFromDB()))
          //console.log("Discounted events ",(this.lokiDBServie.getEventsFromDB() as unknown as Collection<any>).find({'discountedPrice': {'$gte': 0}}));
        }
        else console.log("events is not updated")
    })
  } */
}
