import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import { Trip } from '../trip';

@Injectable()
export class FakeTripBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const allTrips: Trip[] = JSON.parse(localStorage.getItem('allTrips')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // all trips
            if (request.url.match(/\/api\/\d\/trips\+$/) && request.method === 'GET') {

                const body = {
                    species: allTrips,
                    token: 'fake-jwt-token'
                };

                return Observable.of(new HttpResponse({ status: 200, body: body }));
            }

            // get trip by id
            if (request.url.match(/\/api\/\d\/trips\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid,
                //    this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    const id = parseInt(urlParts[urlParts.length - 1]);
                    const matchedTrips = allTrips.filter(tr => tr.Id === id);
                    const trip = matchedTrips.length ? matchedTrips[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: trip }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // create trip
            if (request.url.match(/\/api\/\d\/trips/) && request.method === 'POST') {
                // get new user object from post body
                const newTrip = request.body;

                // save new user
                newTrip.id = allTrips.length + 1;
                allTrips.push(newTrip);
                localStorage.setItem('allTrips', JSON.stringify(allTrips));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // pass through any requests not handled above
            return next.handle(request);
        });
    }
}

export let fakeTripBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeTripBackendInterceptor,
    multi: true
};
