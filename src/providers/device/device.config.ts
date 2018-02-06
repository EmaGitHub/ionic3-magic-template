import { Injectable } from '@angular/core';

@Injectable()
export class DeviceConfig {
    // Public configurations used by provider
    public modalTitle: string;

    // Private configurations used in DeviceModule
    private _config = {
        modalTitle : 'MyApp'
    };

    constructor(config?: Partial<DeviceConfig>) {
        if(config){
            if(config.modalTitle){
                this._config.modalTitle = config.modalTitle;
                delete this.modalTitle;
            }
        }
    }

    getModalTitle() {
        return this._config.modalTitle;
    }

}
