import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import * as Loki from 'lokijs';

declare const require: any;
const LokiIndexedAdapter = require('./loki-indexed-adapter');

@Injectable()
export class LokiDatabaseService {

  db: any;
  events: any;

  constructor(
  ) {
  }

  initDB() {
    let promise = new Promise((resolve, reject) => {

      let adapter = new LokiIndexedAdapter();

      this.db = new Loki('EVENTS.db', {
        autosave: true,
        //autoload: true,
        autosaveInterval: 4 * 1000,
        adapter: adapter
      });
    });
    console.log("Init Event database")
    return promise;

  }

  saveEventsInDB(eventsToLoad: any): Promise<any>{

    let promise = new Promise((resolve, reject) => {

        let events = this.db.getCollection('EVENTS');
        if (events) {
          this.db.removeCollection('EVENTS');
        }
        this.events = this.db.addCollection('EVENTS');
        this.events.insert(eventsToLoad);
        resolve(true);
    });
    return promise;
  }

  getEventsFromDB(){

    this.db.loadDatabase({}, (err: any) => {
      if (err) {
        console.log("Error: ",err);
        return null;
      }
      else {
        return this.db.getCollection('EVENTS');
      }
    });
  }

}