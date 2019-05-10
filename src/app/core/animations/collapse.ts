import { animate, state, style, transition, trigger } from '@angular/animations';

export const Collapse = trigger('collapse', [
    state('0', style({ })),
    state('1', style({ height: 0, 'min-height': 0 })),
    transition('* => *', animate('250ms'))
]);
