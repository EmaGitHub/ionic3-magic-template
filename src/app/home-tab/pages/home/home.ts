import { Component, OnInit } from '@angular/core';
import { FadeInOut } from '@app/core/animations';
import { LokiDatabaseService } from '@app/core/lokijs-database/LokiDBService';
import { EventsService } from '@app/core/events/events-service';
import { Store } from '@ngrx/store';
import { AppStore } from '@app/app-store';
import { EventsActionTypes } from '@app/core/events/actions/events-action-types';
import { Action } from 'rxjs/scheduler/Action';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    animations: [
        FadeInOut,
    ]
})
export class HomePage implements OnInit{

    private visibleText: string = '0';

    constructor(
        private lokiDbService: LokiDatabaseService,
        private eventsService: EventsService,
        private store: Store<AppStore>,
        private alertCtrl: AlertController
            ) {

    }

    ngOnInit(){ 
    }

    ngAfterViewInit(){

        /* this.eventsService.getEvents().subscribe(
            
            (events: any) => {

                this.lokiDbService.saveEventsInDB(events).then(() => {

                    this.store.dispatch({type: EventsActionTypes.EVENTS_UPDATED})
                    console.log("Events fetched, saved in DB, changed event state")
                })
                
            },
            (error: any) => {
                this.store.dispatch({type: EventsActionTypes.OLD_EVENTS_LOADED})
                console.log("Error fetching events: ",error)
            }) */
    }

    ionViewWillEnter(){
        
        setTimeout(() => {
            this.visibleText = '1';
        }, 500);
     }


}
