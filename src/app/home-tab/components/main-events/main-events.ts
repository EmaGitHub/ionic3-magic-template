import { Component, OnInit } from '@angular/core';
import { Event } from '@app/core/models/Event';

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

  mainEvents: Partial<Event>[] = [];

  constructor() {

  }

  ngOnInit(){

    this.mainEvents = [{title: 'Laboratorio botanica', dateBegin: new Date('11/09/2020'), dateEnd: new Date('11/12/2020')}, {title: 'Inside Magritte', dateBegin: new Date('11/09/2020'), dateEnd: new Date('11/09/2021')}];
  }

}
