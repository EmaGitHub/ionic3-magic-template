import { Nav } from 'ionic-angular';

export interface ISplitViewConfig {
    nav: Nav;
    page: any;
    params?: {
        title?: string,
        icon?: string,
        label?: string
    }
}
