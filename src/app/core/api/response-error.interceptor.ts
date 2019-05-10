import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from '@core/auth';
import { DeviceService } from '@core/device';
import { LoginStates, UserService } from '@core/user';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
    private _isRefreshingToken: boolean = false;
    private _tokenSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);

    constructor(
        private injector: Injector
    ) {}

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error: any) => {
                const deviceService: DeviceService = this.injector.get(DeviceService);
                if (deviceService.isOnline()) {
                    if (error instanceof HttpErrorResponse) {
                        switch ((error as HttpErrorResponse).status) {
                            case 401:
                                return this._handle401Error(req, error, next);
                            default:
                                return this._handleError(error);
                        }
                    }
                    else {
                        return this._handleError(error);
                    }
                }
                else {
                    return this._handleError({
                        status: -1,
                        message: 'DEVICE_OFFLINE'
                    })
                }
            });
    }

    private _handleError(err: any) : Promise<any> {
        if (err && err.error) {
            return Promise.reject(err.error);
        }
        else {
            return Promise.reject(err);
        }
    }

    private _handle401Error(req: HttpRequest<any>, err: any, next: HttpHandler) : Observable<any> | Promise<any> {
        const authService: AuthService = this.injector.get(AuthService);
        const userService: UserService = this.injector.get(UserService);

        // If the user is logged the session was expired so I will try to refresh that token
        if (userService.isLogged()) {
            if (!this._isRefreshingToken) {
                this._isRefreshingToken = true;

                // Reset here so that the following requests wait until the token
                // comes back from the refreshToken call.
                this._tokenSubject.next(null);

                return authService.fetchAccessToken()
                    .switchMap((newToken: string) => {
                          if (newToken) {
                              this._tokenSubject.next(newToken);
                              return next.handle(this._updateTokenInRequest(req, newToken));
                          }

                          // If we don't get a new token, we are in trouble so logout.
                          userService.logout(LoginStates.THROW_OUT);
                          return this._handleError(err);
                    })
                    .catch(() => {
                        // If there is an exception calling 'refreshToken', bad news so logout.
                        userService.logout(LoginStates.THROW_OUT);
                        return this._handleError(err);
                    })
                    .finally(() => {
                        this._isRefreshingToken = false;
                    });
            }
            else if (req.url.includes('getAccessToken')) {
                return this._handleError(err);
            }
            else {
                return this._tokenSubject
                    .filter(token => token != null)
                    .take(1)
                    .switchMap(token => {
                        return next.handle(this._updateTokenInRequest(req, token as string));
                    });
            }
        }
        else {
            return this._handleError(err);
        }
    }

    /**
     * Clone the request updating the Authorization token header
     * @param  {HttpRequest<any>} req Old request to update and retry
     * @param  {string} token New token to add in the Authorization header
     * @returns HttpRequest
     */
    private _updateTokenInRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
        let headersKeys = req.headers.keys();
        let clonedHeaders: {[name: string]: string } = {};
        headersKeys.forEach((header: string) => {
            clonedHeaders[header] = req.headers.get(header) as string;
        });
        clonedHeaders['Authorization'] = `Bearer ${token}`;
        return req.clone({ setHeaders: clonedHeaders});
    }
}
