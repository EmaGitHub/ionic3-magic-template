import { NgModule } from '@angular/core';

import { EventsAroundComponent } from './events-around/events-around';
import { ScrollImageComponent } from './scroll-image/scroll-image';
@NgModule({
	declarations: [
    EventsAroundComponent,
    ScrollImageComponent],
	imports: [],
	exports: [
    EventsAroundComponent,
    ScrollImageComponent]
})
export class ComponentsModule {}
