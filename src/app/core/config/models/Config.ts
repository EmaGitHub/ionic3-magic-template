import { Versioning } from '@core/versioning';

import { BackendConfig } from './BackendConfig';

export class Config {
    public lastModified?: string | null;
    public versioning: Versioning[];
    public backend: BackendConfig;
    public loggerLevel: string;
    public devMode: boolean;

    constructor(
        config: Config
    ) {
        this.versioning = config.versioning || [];
        this.backend = new BackendConfig(config.backend);
        this.loggerLevel = config.loggerLevel || 'ERROR';
        this.devMode = config.devMode || false;
        this.lastModified = config.lastModified || null;
    }
}
