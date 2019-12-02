import { Component, OnInit } from '@angular/core';

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

  mainEvents: any[] = [];

  constructor() {

  }

  ngOnInit(){

    this.mainEvents = [{}, {}];
  }

}
