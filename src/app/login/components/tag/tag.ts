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

  colors: string[] = ['#525389','#900060 ','#5eb246','#7b6cef','#7b6cef','#ef86a8','#9543cf','#8080ff','#912cee', '#918698',
                      '#768fe6','#d58fe6','#79bd77','#f23224','#f27776', '#bc7776', '#bcc1e9', '#42ece9', '#cf8ce9', '#cf8c11']

  constructor() {

  }

  ngOnInit(){

    this.backgroundColor = 'linear-gradient(to right, '+ this.colors[Math.floor(Math.random() * this.colors.length)+1]+', '+ this.colors[Math.floor(Math.random() * this.colors.length)+1];
  }

  styleObject(){

    return {'background': this.activated ? this.backgroundColor : '#2C2C2C', 
    'color': this.activated ? 'white' : 'gray',
    'font-weight': this.activated ? 'bold' : '400'
  }
  }

  tapped(){

    this.activated = !this.activated;
  }
}
