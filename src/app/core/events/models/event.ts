export class Event {

    title: string= '';
    shortTitle: string= '';
    dateBegin?: Date;
    dateEnd?: Date;
    type?: string;
    icon?: string;
    label: string= '';
    description: string= '';
    background?: string;
    position: any;
    regionalPrice: number= 0;
    /* exclusive */
    isRecommented: boolean = false;
    isHighlight: boolean= false;
    discountedPrice: number= 0;
}