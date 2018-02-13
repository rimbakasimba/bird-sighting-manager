import { Component, OnInit } from '@angular/core';
import { IBird } from './bird';
import { BirdService } from '../birds/bird.service';

@Component({
    moduleId: module.id,
    templateUrl: 'bird-list.component.html',
    styleUrls: ['bird-list.component.css']
})
export class BirdListComponent implements OnInit {
    pageTitle = 'Bird List';
    imageWidth = 100;
    imageMargin = 2;
    listFilter = '';
    errorMessage = '';

    birds: IBird[];

    constructor(private birdService: BirdService) {
        this.birds = new Array<IBird>();
    }

    ngOnInit(): void {
        console.log('ngInit called');
        this.birdService.getBirds()
            .subscribe(
            birdCollection => {
                console.log('hello' + birdCollection.length);
                this.birds = birdCollection;
                console.log(birdCollection);
            },
            error => {
                this.errorMessage = <any>error;
                console.log(error);
            }
            );
    }

    filterBirds(criteriaJSON: string): IBird[] {

        const selectedBirds: IBird[] = new Array<IBird>();

        if (this.birds === null) {
            throw new Error('Bird data is null');
        } else {
            console.log('Bird data is not null');
            if (this.birds.length === 0) {
                throw new Error('Bird data is not present');
            }
        }

        if (criteriaJSON != null) {
            console.log('We have ' + this.birds.length + ' birds');
            // console.log(criteriaJSON);
            const selectionCriteria = JSON.parse(criteriaJSON);
            console.log(selectionCriteria);
            if (selectionCriteria.Beak !== undefined) {
                this.birds.forEach((b: IBird) => {
                    console.log(b.Beak);
                    if (b.Beak === selectionCriteria.Beak) {
                        selectedBirds.push(b);
                        console.log('Got a match');
                    }
                });
            } else {
                console.error('Beak details not provided');
                throw Error('Invalid criteria');
            }
        }
        return selectedBirds;
    }

}
