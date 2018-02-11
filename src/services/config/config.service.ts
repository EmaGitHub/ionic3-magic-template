import FileDiConfigurazione from '@mocks/config/config.json';

import { Config } from './config.model';

export class ConfigService {
    private config: Config;

    constructor(

    ) { }

    getApi() {

    }

    update() {
        this.config = <Config>FileDiConfigurazione;

    }

    // update() {
    //     // Scarico il file di configurazione e
    //     return axios.get(`${this._configUrl}?t=${new Date().getTime()}`).then(
    //         configData => {
    //             Logger.debug('File di configurazione scaricato correttamente', configData);

    //             // Ho scaricato correttamente il file di configurazione, quindi lo memorizzo nel localStorage
    //             Storage.setConfig(configData);
    //             this._config = configData;
    //             Logger.init(configData.loggerLevel);
    //         },
    //         () => {
    //             Logger.warn('File di configurazione non scaricato; tento recupero da localStorage');

    //             // Il reperimento del file di configurazione è fallito quindi recupero quello presente nel localStorage (se esiste)
    //             let config = Storage.getConfig();

    //             if (!_.isEmpty(config)) {
    //                 // Visto che sono riuscito a recuperarlo proseguo correttamente
    //                 this._config = config;
    //                 return Promise.resolve();
    //             }
    //             else {
    //                 // Dato che nel localStorage sembra non esserci non posso avviare l'app,
    //                 // quindi ritorno un errore
    //                 return Promise.reject(new Error('Error during app initialization.\nPlease, check your Internet connection and restart the app.'));
    //             }
    //         }
    //     );
    // }
}
