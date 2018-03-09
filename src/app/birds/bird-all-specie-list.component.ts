import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { IBird } from './index';
import { BirdService } from '../birds/bird.service';


@Component({
    templateUrl: 'bird-all-specie-list.component.html',
    styleUrls: ['bird-all-specie-list.component.css']
})

export class BirdAllSpecieListComponent implements OnInit, OnDestroy {

    private allSpecies: Observable<any>;
    private specieSub: Subscription;
    pageTitle = 'All Species Of Indian Birds';
    constructor(private birdService: BirdService) {

    }

    ngOnInit() {
        this.allSpecies = this.birdService.getAllSpeciesFromFirebase();
        this.specieSub = this.allSpecies.subscribe();
    }

    ngOnDestroy() {
        this.specieSub.unsubscribe();
    }
}
