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
  actived: boolean = true;

  colors: string[] = ['DarkOrchid','DarkOliveGreen ','DeepSkyBlue','DarkTurquoise','DarkOrange','FireBrick','Gray','LawnGreen','LightSalmon','MidnightBlue', 'Indigo',
                      'Violet','Maroon','Red','SlateBlue','Tomato', 'Wheat', 'SteelBlue', 'SkyBlue', 'Salmon', 'RebeccaPurple', 'PaleGreen', 'LightSteelBlue']

  constructor() {

  }

  ngOnInit(){

    let random = Math.floor(Math.random() * this.colors.length) + 1;
    this.backgroundColor = this.colors[random];
  }

  tapped(){

    console.log("clicked")
    this.actived = !this.actived;
  }
}
