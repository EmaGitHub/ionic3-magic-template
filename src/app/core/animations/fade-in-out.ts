import { animate, state, style, transition, trigger } from '@angular/animations';

export const FadeInOut = trigger('fade-in-out', [
    
    state('0', style({ opacity: 0 })),
    state('1', style({ opacity: 1 })),
    transition('* => *', animate('400ms'))
]);
