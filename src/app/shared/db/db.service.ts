import { Injectable } from '@angular/core';
import { DeviceService } from '@app/core/device/device.service';

import { LokiConfigOptions } from './models/LokiConfigOptions';

declare var require: any;
var LokiJS = require('lokijs');

@Injectable()
export class DBService {

    constructor(
        private deviceService: DeviceService
    ) { }


    /**
     * Create new LokiJS db
     * If the app runs on browser it persists data on localStorage
     * while in a real device it persists data on file system,
     * using the LokiCordovaFSAdapter and the cordova-plugin-file
     * @param  {string} dbName
     * @param  {Partial<LokiConfigOptions>} lokiOptions?
     */
    createLokiDB(dbName:string, lokiOptions?: Partial<LokiConfigOptions>) {

        lokiOptions = new LokiConfigOptions(lokiOptions);

        if(this.deviceService.isCordova()){
            lokiOptions.env = 'CORDOVA';
            if (!lokiOptions.adapter) {
                lokiOptions.adapter = new (window as any).LokiCordovaFSAdapter({ 'prefix' : dbName });
            }
        }
        else {
            lokiOptions.env = 'BROWSER';
            lokiOptions.persistenceMethod = 'localStorage';
        }

        return new LokiJS(dbName, lokiOptions);
    }
}
