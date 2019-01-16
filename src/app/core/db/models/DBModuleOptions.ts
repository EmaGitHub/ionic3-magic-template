import { LokiConfigOptions } from './LokiConfigOptions';

export class DBModuleOptions {
    constructor(
        public dbName?: string,
        public dbOptions?: LokiConfigOptions,
        public loadOptions?: {
            [collection: string] : any
        }
    ){ }
}
