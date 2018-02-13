import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { LoggerServiceConfig } from './logger.config';
import { LoggerService } from './logger.service';

/**
* @name LoggerModule
* @description
* LoggerModule is an ngModule that imports the loggerService to log in browser or Cordova device
* with programmable level of log
*/
@NgModule({
    providers: [
        LoggerService
    ]
})
export class LoggerModule {
    constructor (@Optional() @SkipSelf() parentModule: LoggerModule) {
        if (parentModule) {
            throw new Error('LoggerModule is already loaded. Import it in the AppModule only');
        }
    }


    /**
    * Allow to pass a <LoggerServiceConfig> configuration to LoggerService
    * @param  {LoggerServiceConfig} config all available configuration for <LoggerServiceConfig>
    * @returns {ModuleWithProviders}
    */
    static forRoot(config?: Partial<LoggerServiceConfig>): ModuleWithProviders {
        return {
            ngModule: LoggerModule,
            providers: [
                { provide: LoggerServiceConfig, useValue: config }
            ]
        }
    }
}
