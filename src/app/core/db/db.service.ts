import { Injectable, Optional } from '@angular/core';
import { DeviceService } from '@core/device';
import { LoggerService } from '@core/logger/logger.service';
import { ENV } from '@env';
import LokiJS, { Collection } from 'lokijs';

import { DBModuleOptions } from './models/DBModuleOptions';
import { LokiConfigOptions } from './models/LokiConfigOptions';

declare const require: any;
const LokiCordovaFSAdapter = require('loki-cordova-fs-adapter');
const LokiIndexedAdapter = require('./loki-indexed-adapter');

@Injectable()
export class DBService {
    private db!: LokiJS;
    public initCompleted!: Promise<any>;

    constructor(
        @Optional() options: DBModuleOptions,
        private deviceService: DeviceService,
        private logger: LoggerService
    ) {
        const DB = this;
        this.initCompleted = new Promise((resolve, reject) => {
            if (this.deviceService.isCordova()) {
                document.addEventListener('deviceready', () => {
                    DB._initLokiDB(options).then(resolve, reject);
                }, true);
            }
            else {
                DB._initLokiDB(options).then(resolve, reject);
            }
        });
    }

    /**
     * Create new LokiJS db and persists data on localStorage with IndexedDB adapater
     * @param  {string} dbName
     * @param  {Partial<LokiConfigOptions>} lokiOptions?
     */
    private _createLokiDB(dbName:string, lokiOptions?: Partial<LokiConfigOptions>): LokiJS {

        lokiOptions = new LokiConfigOptions(lokiOptions);

        // Remove the old DB stored in file system
        try {
            let oldAdapter = new LokiCordovaFSAdapter({ prefix: dbName });
            oldAdapter.deleteDatabase(dbName, () => {
                this.logger.debug('Old LokiJS DB deleted');
            });
        } catch (e) {}

        if (!lokiOptions.adapter) {
            lokiOptions.adapter = new LokiIndexedAdapter(dbName, { closeAfterSave: true });
        }
        lokiOptions.env = 'BROWSER';
        lokiOptions.persistenceMethod = 'localStorage';

        return new LokiJS(dbName, lokiOptions);
    }

    /**
     * Get the collection from its name,
     * or, if not exists, create it and returns
     * @param  {string} name
     */
    public getOrCreateCollection(name: string): Collection {
        // Init the allMeeting collection
        let newCollection = this.db.getCollection(name);
        if (newCollection === null) {
            newCollection = this.db.addCollection(name);
        }
        newCollection.data = newCollection.data.filter(doc => typeof doc.$loki === 'number' && typeof doc.meta === 'object');
        newCollection.ensureId();
        newCollection.ensureAllIndexes();
        return newCollection;
    }

    /**
     * Create a new LokiJS DB
     * @returns Promise
     */
    private _initLokiDB(options: DBModuleOptions): Promise<LokiJS> {
        // Init the DB name
        if (!options.dbName) {
            options.dbName = ENV.storePrefix || 'db';
        }
        // Init the DB costructor options
        if (!options.dbOptions) {
            options.dbOptions = {
                autosave: false,
                autoload: false,
                verbose: true,
                env: 'BROWSER',
                persistenceMethod: 'localStorage'
            }
        }
        // Init the DB load options
        if (!options.loadOptions) {
            // Init the DB load options
            options.loadOptions = {};
        }

        return new Promise((resolve, reject) => {

            // Create a LokiJS DB
            this.db = this._createLokiDB(options.dbName as string, options.dbOptions);

            // Load database
            this.db.loadDatabase(options.loadOptions, (data: any) => {
                if (data instanceof Error) {
                    reject(data);
                }
                else {
                    resolve(this.db);
                }
            });
        });
    }

    public getDB(): LokiJS {
        return this.db;
    }

    public saveDB(): void {
        this.db.saveDatabase();
    }
}
