import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { CookieService } from 'angular-cookies';
// import { CookieOptionsArgs } from 'angular-cookies';
// import { tokenNotExpired, JwtHelper } from 'angular-jwt';

@Injectable()
export class AuthenticationService {

    public token: string;
    private headers: Headers;
    private requestoptions: Request;
    // TODO: Take this from configuration rather than hard coding
    private serviceUrl: string = 'http://localhost:60736/api/User/';
    // private jwtHelper: JwtHelper;

    // The domain where this app is deployed. All apps on this domain will be able to use the cookie
    // TODO: Take this from configuration instead of hard coding
    private domainName: string = 'localhost';
    private localStorageKey: string = 'currentUser';
    private cookieKey: string = 'crossoverAuthUser';
    // How many hours should the cookie remain valid. TODO: Take this from configuration rather than hardcoding
    private cookieExpirationLength: number = 4;

    constructor(private httpClient: HttpClient) {
        // private http: Http,
        // private cookieService: CookieService) {

             // set token if saved in local storage
        this.token = localStorage.getItem(this.localStorageKey);

        // this.jwtHelper = new JwtHelper();
        }

    login(username: string, password: string) {
        return this.httpClient.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    loginToFirebase(username: string, password: string) {
        
    }
/*  backup code
    loginUsingJWT(userName: string, password: string): Observable<string> {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        // this.headers.append("Authorization", 'Bearer ' + localStorage.getItem('id_token'))
        const data = JSON.stringify({ UserId: userName, Password: password });
        this.requestoptions = new Request({
            method: RequestMethod.Post,
            url: this.serviceUrl + 'Authenticate',
            headers: this.headers,
            body: data
        });

        return this.httpClient.request(new Request(this.requestoptions))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const authResponse = response.json();

                if (authResponse && authResponse.IsAuthenticated) {

                    this.token = authResponse.Token;
                    // Validate token for any expiry
                    // TODO: Need to also validate for tampering
                    const isExpired = false; // this.jwtHelper.isTokenExpired(this.token);
                    if (!isExpired) {

                        // store userName and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem(this.localStorageKey, this.token);
                        // TODO: In birdion, set the secured flag to true to enable HTTPS
                       
                        const expireDate = new Date();
                        expireDate.setHours(expireDate.getHours() + this.cookieExpirationLength);
                        const cookieOptions: CookieOptionsArgs = {
                            path: '/',
                            secure: false,
                            domain: this.domainName,
                            expires: expireDate
                        };
                          this.cookieService.put(this.cookieKey, this.token, cookieOptions);
                       
                       // const tokenInfo = this.jwtHelper.decodeToken(this.token);

                        // return display name to indicate successful login
                        return authResponse.UserDisplayName;
                    }
                }
            })
            .catch((error: any) => {
                if (error.status === 500) {
                    return Observable.throw(new Error(error.status));
                } else if (error.status === 401) {
                    return Observable.throw(new Error(error.status));
                }
                return Observable.throw(new Error(error));
            });
    }
*/
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    logouUsingJWTt(): Promise<boolean> {

        return new Promise(resolve => {
            localStorage.removeItem(this.localStorageKey);
            // this.cookieService.remove(this.cookieKey);
            resolve(true);
        });

    }

    isLoggedIn(): Observable<boolean> {
        //  A user can either be logged in its own application (1st check)
        //     of in some other application (SSO)

        const userToken = localStorage.getItem(this.localStorageKey);
        if (userToken == null) {
           // const cookie = this.cookieService.get(this.cookieKey);
            // const isLoggedInAlreadyWithSSO = (!((cookie == null) || (cookie.length === 0)));
           //return Observable.of(isLoggedInAlreadyWithSSO);
        }
        return Observable.of(true);
    }
}
