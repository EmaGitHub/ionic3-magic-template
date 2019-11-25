import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/api';
import { DeviceService } from '@core/device';
import { ENV } from '@env';
import { Storage } from '@ionic/storage';
import CryptoJS, { AES } from 'crypto-js';
import { Observable } from 'rxjs/Observable';

import { IAuthResponse } from './models/AuthResponse';

const storageKeys = {
    token: 'token'
};

@Injectable()
export class AuthService {
    private applicationKey = 'demo-key-0xFF6';
    private accessToken: string|null = null;
    private refreshToken: string|null = null;
    private storage: Storage;

    constructor(
        private apiService: ApiService,
        private deviceService: DeviceService
    ) {
        this.storage = new Storage({
            name: ENV.appName.replace(/ /g, ''),
            storeName: 'auth',
            driverOrder: ['localstorage']
        });
    }

    /**
     * Get the application key
     * @returns string
     */
    public getApplicationKey(): string {
        return this.applicationKey;
    }

    /**
     * Get the current value of accessToken
     * @returns string
     */
    public getAccessToken(): string|null {
        return this.accessToken;
    }

    /**
     * Set the accesstoken in memory
     * @param  {string|null=null} accessToken
     */
    public setAccessToken(accessToken: string|null = null): void {
        this.accessToken = accessToken;
    }

    /**
     * Get the current accessToken
     * @returns string
     */
    public getRefreshToken(): string|null {
        return this.refreshToken;
    }

    /**
     * Reset the refreshToken from memory and storage
     * @param  {string|null=null} refreshToken
     */
    public setRefreshToken(refreshToken: string|null = null): void {
        this.refreshToken = refreshToken;
        let encryptedToken = AES.encrypt(JSON.stringify(refreshToken), this.deviceService.getUUID());
        this.storage.set(storageKeys.token, encryptedToken.toString());
    }

    /**
     * Get the refreshToken from native (secure) storage
     * @returns Promise
     */
    public getRefreshTokenFromStorage(): Promise<string|null> {
        return this.storage.get(storageKeys.token).then((cryptedToken: string) => {
            try {
                let plainTokenObj = AES.decrypt(cryptedToken.toString(), this.deviceService.getUUID()).toString(CryptoJS.enc.Utf8);
                return JSON.parse(plainTokenObj);
            }
            catch (e) {
                return cryptedToken;
            }
        });
    }

    /**
     * Reset accessToken and refreshToken
     */
    public reset(): void{
        this.setAccessToken();
        this.setRefreshToken();
        this.storage.remove(storageKeys.token);
    }

    /**
     * Fetch the auth tokens using username and password
     * @param {string} username User's username
     * @param {string} password User's password
     */
    public authenticate(username: string, password: string): Promise<any> {
        return this.fakeAuth(); 
        /* new Promise((resolve, reject) => {
            let credentials = new HttpParams()
                .set('username', username)
                .set('password', password);
            this.apiService.callApi('credentials', {
                body: credentials.toString()
            }).subscribe(
                (res: any) => {
                    console.log("api response ok")
                    this.setAccessToken((res as IAuthResponse).accessToken);
                    this.setRefreshToken((res as IAuthResponse).refreshToken);
                    resolve();
                },
                (err: any) => {
                    console.log("api response ko ",err)
                    reject(err);
                }
            );
        }); */
    }

    /**
     * Fetch the auth token for the public access
     * @returns Promise
     */
    public fetchPublicAccess(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiService.callApi('public').subscribe(
                (res: any) => {
                    this.setAccessToken((res as IAuthResponse).accessToken);
                    this.setRefreshToken((res as IAuthResponse).refreshToken);
                    resolve((res as IAuthResponse).accessToken);
                },
                reject
            );
        });
    }

    /**
     * Get the new accessToken from the actual refreshToken
     * @returns Observable
     */
    public fetchAccessToken(refreshToken?: string): Observable<any> {
        // Set the refreshToken as accessToken to obtain a new accessToken
        if (refreshToken) {
            this.setAccessToken(refreshToken);
        }
        else {
            this.setAccessToken(this.getRefreshToken());
        }
        const authService = this;
        return this.apiService.callApi('getAccessToken')
            .map(res => {
                const token = (res as IAuthResponse).accessToken;
                authService.setAccessToken(token);
                return token;
            })
            .first();
    }

    public fakeAuth(): Promise<any> {

        console.log("fake auth")

        return new Promise((resolve, reject) => {
           
            setTimeout(() => {
                resolve({})
            }, 500);
        });
    }

}
