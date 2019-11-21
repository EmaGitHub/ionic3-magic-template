import { Injectable, Optional } from '@angular/core';
import { ApiService } from '@core/api/api.service';
import { AuthService } from '@core/auth';
import { DeviceService } from '@core/device';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoginStates } from './models/login-states';
import { User } from './models/User';

const profileValidity = 1000 * 60 * 60 * 24;     // The user data is valid for only 24 hours (86400000 mills)

const storageKeys = {
    user: 'user',
    public: 'public',
    firstAccess: 'firstAccess'
};

@Injectable()
export class UserService {
    private user: User | null = null;
    private storage: Storage;
    private firstAccess: boolean = true;
    private publicAccess: boolean = false;
    // Observable to share user login changes
    public onSessionChanges$: Subject<number> = new Subject();

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private deviceService: DeviceService
    ) {
        this.storage = new Storage({
            storeName: 'user',
            driverOrder: ['localstorage']
        });
        this.storage.get(storageKeys.firstAccess).then((isFirstAccess: boolean) => {
            // If firstAccess flag doesn't exists create it with true value
            if (typeof isFirstAccess === 'undefined' || isFirstAccess === null) {
                this.setFirstAccess(true);
            }
            else {
                this.firstAccess = isFirstAccess;
            }
        });
        this.storage.get(storageKeys.public).then((isPublic: boolean) => {
            if (typeof isPublic === 'undefined' || isPublic === null) {
                this.publicAccess = false;
            }
            else {
                this.publicAccess = isPublic;
            }
        });
        this.deviceService.networkStatusChanges$.subscribe((isOnline: boolean) => {
            if (isOnline) {
                this.autologin();
            }
        });
    }

    /**
     * Returns the user full name
     * @returns string
     */
    public getFullName(): string {
        if (this.user) {
            return this.user.getFullName();
        }
        return '';
    }

    /**
     * Returns if user is logged
     * @returns boolean
     */
    public isLogged(): boolean {
        if (this.user) {
            return this.user.isLogged();
        }
        return false;
    }

    /**
     * Makes login with classic username and password
     * @param {string} username User's username
     * @param {string} password User's password
     */
    public login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.authService.authenticate(username, password).then(
                () => {
                    this.fakeFetchUserProfile(username).subscribe(
                        (res: any) => resolve()
                    );
                    /* this.fetchUserProfile(username).subscribe(
                        (res: any) => {
                            try {
                                this.startSession(username, res.data.users.items[0]);
                                this.setFirstAccess();
                                resolve();
                            }
                            catch (err) {
                                reject(err);
                            }
                        },
                    ); */
                },
                (err: Error) => {
                    console.log("rejected in user.service")
                    reject(err);
                }
            )
        });
    }

    /**
     * If the refreshToken is stored try to use it to fetch a new accessToken
     * after that get the last user info in storage to use as user and go in
     */
    public autologin(): Promise<any> {
        return new Promise((resolve, reject) => {
            // If the user has already access to the app check user info
            if (!this.isFirstAccess()) {
                // Get the refreshToken
                this.authService.getRefreshTokenFromStorage().then((refreshToken: string|null) => {
                    if (refreshToken) {
                        // If the device is online try to get the new access token
                        if (this.deviceService.isOnline()) {
                            this.authService.fetchAccessToken(refreshToken).subscribe(
                                () => {
                                    // And restore last user session
                                    this.restoreLastSession().then(
                                        resolve,
                                        reject
                                    )
                                },
                                reject
                            );
                        }
                        // Otherwise enter in app without set accessToken
                        // The app will use the DB and when online will be fetch the new accessToken with interceptor
                        else {
                            // And restore last user session
                            this.restoreLastSession().then(
                                resolve,
                                reject
                            )
                        }
                    }
                    else {
                        reject("no refresh token");
                    }
                })
            }
            // Otherwise reject and go to login page
            else {
                reject();
            }
        })/* .catch((error: any) => {

        }); */
    }

    /**
     * Get user's information using the backend GraphQL
     * @param {string} username User's username
     */
    public fetchUserProfile(username: string): Observable<any> {
        const query = {
            query: `
                query {
                    users(userCodes: "${username}") {
                        items {
                            id
                            firstName
                            lastName
                            profile {
                                communitiesByPreference {
                                    id
                                    shortName
                                    nameEn
                                    nameFr
                                }
                                communitiesByMembership {
                                    community {
                                        id
                                        shortName
                                        nameEn
                                        nameFr
                                    }
                                }
                            }
                        }
                    }
                }`
        };
        return this.apiService.callApi('getUserProfile', {
            body: query
        });
    }

    public refreshUserProfile(): Promise<any> {
        return new Promise((resolve, reject) => {
            // If the current profile data was refreshed during last 24 hours => resolve
            if (new Date().getTime() - (this.user as User).timestamp < profileValidity) {
                resolve();
            }
            // Otherwise if the user is loggd I can update its data (if online)
            else if (this.deviceService.isOnline() && this.isLogged()) {
                this.fetchUserProfile((this.user as User).username).subscribe(
                    (res: any) => {
                        try {
                            this.startSession((this.user as User).username, res.data.users.items[0]);
                            this.setFirstAccess();
                            resolve();
                        }
                        catch (err) {
                            reject(err);
                        }
                    },
                );
            }
            else {
                resolve();
            }
        });
    }

    /**
     * Get the firstAccess flag to use for public access
     * @returns Promise
     */
    public isFirstAccess(): boolean {
        return this.firstAccess;
    }

    /**
     * Set the firstAccess flag to use for public access
     * As default the firstAccess flag will be disabled
     */
    public setFirstAccess(firstAccess: boolean = false): void {
        this.firstAccess = firstAccess;
        this.storage.set(storageKeys.firstAccess, firstAccess);
    }

    /**
     * Set the user information in localStorage,
     * init the user info in memory
     * and set isPublic to false
     * @param  {User} userData
     */
    public startSession(username: string, userData: User): void {
        userData.username = username;
        userData.timestamp = new Date().getTime();
        this.storage.set(storageKeys.user, userData);
        this.user = new User(userData);
        this.storage.get(storageKeys.user).then((lastUser: User) => {
            if (lastUser && lastUser.id === userData.id) {
                this.onSessionChanges$.next(LoginStates.LAST_USER);
            }
            else {
                this.onSessionChanges$.next(LoginStates.NEW_USER);
            }
        });
    }

    public restoreLastSession(): Promise<any> {
        return new Promise((resolve, reject) => {
            // If the user is logged I can update its data (if online)
            if (this.deviceService.isOnline() && this.isLogged()) {
                this.fetchUserProfile((this.user as User).username).subscribe(
                    (res: any) => {
                        try {
                            this.startSession((this.user as User).username, res.data.users.items[0]);
                            this.setFirstAccess();
                            resolve();
                        }
                        catch (err) {
                            reject(err);
                        }
                    },
                );
            }
            // Otherwise the user is an invited one, so I can0't update its data
            else {
                this.storage.get(storageKeys.user).then((lastUser: User) => {
                    if (lastUser) {
                        this.user = new User(lastUser);
                        resolve();
                    }
                    else {
                        reject(new Error('ERR_NO_LAST_USER_INFO'));
                    }
                });
            }
        });
    }

    /**
     * Destroy the user session and the user info in DB
     */
    public endSession(): void {
        this.user = null;
        this.storage.remove(storageKeys.user);
    }

    /**
     * Logout the user,
     * destroy all his references
     * and get new accessToken for public access
     * @param  {LoginStates} loginState LOGOUT if user logs out or THROW_OUT if the refreshToken expire
     */
    public logout(loginState: LoginStates): void {
        this.deviceService.showLoading();
        this.endSession();
        this.onSessionChanges$.next(loginState);
    }

    public fakeFetchUserProfile(username: string): Observable<any>{

        console.log("fake feth user profile")

        var source = Observable.create(
            (observer: any) => {
                observer.next()
            },
            (error: Error) => {
                console.log("error ",error)
            });
        
        return source; 
    }
}
