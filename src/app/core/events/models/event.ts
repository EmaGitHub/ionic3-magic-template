export class Event {

    title: string= '';
    shortTitle: string= '';
    dateBegin: Date =  new Date('11/09/2020');
    dateEnd: Date= new Date('11/12/2020');
    type?: string;
    icon?: string;
    label: string= 'label';
    description: string= 'description';
    background?: string;
    position: any;
    regularTicketPrice: number= 0;
    /* exclusive */
    isRecommented: boolean = false;
    isHighlight: boolean= false;
    discountedTicketPrice: number= 0;
}