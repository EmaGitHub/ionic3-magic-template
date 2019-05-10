import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-modal-nav',
    templateUrl: 'modal-nav.html',
})
export class ModalNavPage {
    public modalPage: any;
    public modalParams: any = { };

    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) { }

    public ionViewDidLoad(): void {
        console.log('ionViewDidLoad ModalNavPage');
        this.modalPage = this.navParams.get('page');
    }

    public dismissModal(): void {
        this.viewCtrl.dismiss();
    }
}
