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
        this.events = [
          {"shortTitle": "Carnevale di Bocco", "type": "SPETTACOLO", "title": "Carnivale dei Figli di Bocco", "discountedTicketPrice": 4.55, "label": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "regularTicketPrice": 8.98, "locationName": "Castiglion Fibocchi", "locationAddress": " Via Marchese Alessandro dal Borro, 5, 52029 Castiglion Fibocchi AR, Italia", "dateBegin": new Date(2019,0,1), "dateEnd": new Date(2019,1,14),
          "description":"similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."}, 
          {"shortTitle": "Antiche Camelie", "type": "MOSTRA", "title": "Mostra sulle Antiche Camelie", "discountedTicketPrice": 4.55, "label": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          "regularTicketPrice": 8.98, "locationName": "Castiglion Fibocchi", "locationAddress": " Via Marchese Alessandro dal Borro, 5, 52029 Castiglion Fibocchi AR, Italia", "dateBegin": new Date(2019,0,1), "dateEnd": new Date(2019,1,14),
          "description":"similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."}, 
        
        {shortTitle: 'Carnevale di Bocco', type: 'SPETTACOLO'}, 
        {shortTitle: 'Antichi egizi', type: 'MOSTRA'}, 
        {shortTitle: 'Assedio alla Villa', type: 'SPETTACOLO'}, 
        {shortTitle: 'Futuro e tecnologia', type: 'MOSTRA'}];
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
