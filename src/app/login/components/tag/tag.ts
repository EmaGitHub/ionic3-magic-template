import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the TagComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tag',
  templateUrl: 'tag.html'
})
export class TagComponent implements OnInit{

  @Input() tag: string = '';
  backgroundColor: string = '';
  activated: boolean = false;

  colors: string[] = ['DarkOrchid','DarkOliveGreen ','DeepSkyBlue','DarkTurquoise','DarkOrange','FireBrick','LawnGreen','LightSalmon','MidnightBlue', 'Indigo',
                      'Violet','Maroon','Red','SlateBlue','Tomato', 'Wheat', 'SteelBlue', 'SkyBlue', 'Salmon', 'RebeccaPurple', 'PaleGreen', 'LightSteelBlue']

  constructor() {

  }

  ngOnInit(){

    let random = Math.floor(Math.random() * this.colors.length) + 1;
    this.backgroundColor = this.colors[random];
  }

  styleObject(){

    return {'background-color': this.activated ? this.backgroundColor : 'white', 
    'border': this.activated ? '2px solid transparent' : '2px solid black',
    'color': this.activated ? 'white' : 'black'}
  }
  

  tapped(){

    this.activated = !this.activated;
  }
}
