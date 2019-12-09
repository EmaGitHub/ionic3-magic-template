import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the ScrollEventComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'scroll-friend',
  templateUrl: 'scroll-friend.html'
})
export class ScrollFriendComponent implements OnInit {

  @Input() friend?: any;

  friendUrlImage: string = '';

  constructor(
  ) {
  }

  ngOnInit(){

    this.friendUrlImage = 'assets/imgs/'+this.friend.image;
  }
}
