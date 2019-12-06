import { Component, OnInit } from '@angular/core';
import { Event } from '@app/core/events/models/Event';

/**
 * Generated class for the MainEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-events',
  templateUrl: 'main-events.html'
})
export class MainEventsComponent implements OnInit{

  mainEvents: Event[] = [];

  constructor() {

  }

  ngOnInit(){

    this.mainEvents = [new Event({title: "Laboratorio botanico"}), new Event({"title": 'Dentro Magritte'})];
  }

}
