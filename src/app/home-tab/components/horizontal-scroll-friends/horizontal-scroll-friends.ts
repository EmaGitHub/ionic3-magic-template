import { Component, Input, OnInit } from '@angular/core';


/**
 * Generated class for the HorizontalScrollEventsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'horizontal-scroll-friends',
  templateUrl: 'horizontal-scroll-friends.html'
})
export class HorizontalScrollFriendsComponent implements OnInit {

  @Input() friends?: any[];


  constructor(

  ) {

  }

  ngAfterViewInit(){
  }

  ngOnInit(){


    }

}
