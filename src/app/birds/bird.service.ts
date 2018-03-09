import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { AuthHttp } from 'angular-jwt';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/observable';

import { IBird, Bird, IBirdResponse } from './bird';
import { BirdSighting } from './bird-sighting';

import { AngularFireDatabase, ChildEvent } from 'angularfire2/database';

@Injectable()
export class BirdService {

    private url = 'data/birdList.json';
    private urlAllSpecies = 'data/allSpecies.json';
    // TODO: Replace Http with our secured HttpWrapper as an interceptor
    constructor(private _http: HttpClient,
        private db: AngularFireDatabase) {

    }

    /*
    Gets all species available in India. Static list
    */
    getAllSpecies(): IBird[] {
        const species: Bird[] = new Array<Bird>();
        let i: number;
        const bird: Bird = new Bird(0, '', '', '', '');
        for (i = 0; i < 1400; i++) {
            species.push(bird);
        }
        return species;
        /*
         const a = this._http.get<IBirdResponse>(this.urlAllSpecies);
         return a.map((response: IBirdResponse) =>  (<IBirdResponse>response).data )
             .catch(this.errorHandler);
             */
    }

    getAllSpeciesFromFirebase(): Observable<any> {
        console.log('Attempting to get all species from firebase');
        const species: Bird[] = new Array<Bird>();
        const dataList = this.db.list('/AllSpecies');
const evt = new  Array<ChildEvent>('child_added');
       return  dataList.valueChanges(evt);
        // .map(data => IBird[]);
    }

    getMySpecies(userId: string): Observable<IBird[]> {
        const a = this._http.get<IBirdResponse>(this.url);
        return a.map((response: IBirdResponse) => (<IBirdResponse>response).data)
            .catch(this.errorHandler);
    }
    /*
        getMySighting(location: string) : Observable<IBirdSighting[]> {
            return new Observable<BirdSighting>();
        }
    */
    getBirds(): Observable<IBird[]> {
        console.log('Service->getBirds called');
        const a = this._http.get<IBirdResponse>(this.url);
        return a.map((response: IBirdResponse) => (<IBirdResponse>response).data)
            .catch(this.errorHandler);
    }

    getBird(id: number): Observable<IBird> {
        const prod = this.getBirds()
            .map((birds: IBird[]) => birds.find(p => p.Id === id));
        return prod;
    }

    addMySightingToTrip (specieId: number, tripId: string): Observable<Boolean> {
        return Observable.create(true);
    }

    private errorHandler(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


export class BirdDataInFirebase {
   public id: number;
   public name: string;
}
