import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { AuthHttp } from 'angular-jwt';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IBird } from '../birds/bird';
import { IBirdResponse } from '../birds/bird';

@Injectable()
export class BirdService {

    private url: string = 'data/birdList.json';
private urlAllSpecies: string = 'data/allSpecies.json';
    // TODO: Replace Http with our secured HttpWrapper as an interceptor
    constructor(private _http: HttpClient) {

    }

    /*
    Gets all species available in India. Static list 
    */
    getAllSpecies(): Observable<IBird[]> {
        const a = this._http.get<IBirdResponse>(this.urlAllSpecies);
        return a.map((response: IBirdResponse) =>  (<IBirdResponse>response).data )
            .catch(this.errorHandler);
    }

    getMySpecies(): Observable<IBird[]> {
        const a = this._http.get<IBirdResponse>(this.url);
        return a.map((response: IBirdResponse) =>  (<IBirdResponse>response).data )
            .catch(this.errorHandler);
    }

    getMySighting(location: string) : Observable<IBirdSighting[]> {
        
    }

    getBird(id: number): Observable<IBird> {
        const prod = this.getBirds()
            .map((birds: IBird[]) => birds.find(p => p.Id === id));
        return prod;
    }

    private errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
