import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { AuthHttp } from 'angular-jwt';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Trip, ITripResponse } from '../_models/index';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Injectable()
export class TripService {

    private url: string;
    private postUrl: string;
    private myTrips: Trip[];

    constructor(private _http: HttpClient) {
        this.url = '../data/trips.json';
        this.postUrl = 'server/trips/post';
        this.myTrips = new Array<Trip>();
    }

    getMyTrips(userId: string): Observable<Trip[]> {
        const a = this._http.get<ITripResponse>(this.url);
        return a.map((response: ITripResponse) => (<ITripResponse>response).data)
            .catch(this.errorHandler);
    }

    createTrip(location: string, date: string): number {
        const trip: Trip = new Trip(0, location, date, null);
        trip.Id = 5365;
        this.myTrips.push(trip);
        const resp = this._http.post(this.postUrl, trip);
        resp
            .do(r => {
                console.log('Got data' + r);
            })
            .catch(this.errorHandler);
        return trip.Id;
    }

    private errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

