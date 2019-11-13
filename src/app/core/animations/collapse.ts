import { animate, state, style, transition, trigger } from '@angular/animations';

export const Collapse = trigger('collapse', [
    state('0', style({  height: 0, 'min-height': 0 })),
    state('1', style({ })),
    transition('* => *', animate('500ms'))
]);
