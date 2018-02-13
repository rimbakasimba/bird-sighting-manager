import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { Bird } from '../birds';

@Injectable()
export class FakeBirdBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const allSpecies: Bird[] = JSON.parse(localStorage.getItem('allSpecies')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // all species
            if (request.url.endsWith('/api/getAllSpecies') && request.method === 'GET') {

                const body = {
                    species: allSpecies,
                    token: 'fake-jwt-token'
                };

                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }

            // all species
            if (request.url.endsWith('/api/my/getAllSpecies') && request.method === 'GET') {

                const body = {
                    species: allSpecies.slice(0, 50),
                    token: 'fake-jwt-token'
                };

                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }
        });
    }
}

