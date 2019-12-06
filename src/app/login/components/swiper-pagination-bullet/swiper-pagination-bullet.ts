import { Component } from '@angular/core';

/**
 * Generated class for the SwiperPaginationBulletComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'swiper-pagination-bullet',
  templateUrl: 'swiper-pagination-bullet.html'
})
export class SwiperPaginationBulletComponent {

  text: string;

  constructor() {
    console.log('Hello SwiperPaginationBulletComponent Component');
    this.text = 'Hello World';
  }

}
