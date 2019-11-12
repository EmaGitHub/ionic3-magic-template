import { Component } from '@angular/core';

@Component({
    selector: 'page-info',
    templateUrl: 'info.html'
})
export class InfoPage {

    public text: string = "Note: When creating components, pages or whatever with the ionic generate command it will add the class name in the html and create the scss file for you, which means this is the way the ionic team tough about style isolation, just make sure not to name another class in another component with the same name, it’s supposed to be a component class, if needed prefix the class like .admin-masters and/or .client-masters.";
    
    constructor(

    ) {

    }
}
