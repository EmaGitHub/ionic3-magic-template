import { Backend } from '@core/api';
import { IVersioning } from '@core/versioning';

export class Config {
    public lastModified?: string | null;
    public versioning: IVersioning[];
    public backend: Backend;
    public loggerLevel: string;
    public devMode: boolean;

    constructor(
        config: Config
    ) {
        this.versioning = config.versioning || [];
        this.backend = config.backend;
        this.loggerLevel = config.loggerLevel || 'ERROR';
        this.devMode = config.devMode || false;
        this.lastModified = config.lastModified || null;
    }
}
