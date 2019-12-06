export class Event {

    title?: string;
    shortTitle?: string;
    dateBegin?: Date;//  new Date('11/09/2020');
    dateEnd?: Date;// new Date('11/12/2020');
    type?: string;
    icon?: string;
    label?: string;//'label';
    description?: string;// 'description';
    background?: string;
    position: any;
    locationName?: string;
    locationAddress?: string
    regularTicketPrice: number;
    /* exclusive */
    isRecommented: boolean;
    isHighlight: boolean;
    discountedTicketPrice: number;

    constructor(initialValues: Partial<Event>) {
        this.title= initialValues.title;
        this.shortTitle= initialValues.shortTitle;
        this.dateBegin=  new Date('11/9/2020');
        this.dateEnd=new Date('12/2/2020');
        this.type= initialValues.type;
        this.icon= initialValues.type;
        this.label= 'label';
        this.description=  'description';
        this.background= initialValues.background;
        this.position= initialValues.position;
        this.locationName= initialValues.locationName;
        this.locationAddress= initialValues.locationAddress;
        this.regularTicketPrice= 8.99;
        /* exclusive */
        this.isRecommented= false;
        this.isHighlight= false;
        this.discountedTicketPrice= 6.50;
    }

    

}