import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Injectable()
export class NavigationService {

    constructor(
        private launchNavigator: LaunchNavigator,
        private geolocation: Geolocation
    ) { }

    /**
     * @param  {Partial<GeolocationOptions>={}} options
     * @returns Promise
     */
    public getCurrentPosition(options: Partial<GeolocationOptions> = {}): Promise<Geoposition> {
        return this.geolocation.getCurrentPosition(options);
    }

    /**
     * @param  {number} lat
     * @param  {number} lng
     * @param  {Partial<LaunchNavigatorOptions>={}} options
     */
    public navigateToCoordinates(coords: {latitude: number; longitude: number}, options?: Partial<LaunchNavigatorOptions>): Promise<null> {
        return new Promise((resolve, reject) => {
            this.getCurrentPosition().then(
                (position: Geoposition) => {
                    if (!options) {
                        options = {};
                    }
                    options.start = `${position.coords.latitude},${position.coords.longitude}`;
                    this.launchNavigator.navigate([coords.latitude, coords.longitude], options).then(
                        resolve,
                        (err: string) => {
                            reject(new Error(err));
                        }
                    );
                },
                (err: Error) => {
                    reject(err);
                }
            );
        });
    }
}
