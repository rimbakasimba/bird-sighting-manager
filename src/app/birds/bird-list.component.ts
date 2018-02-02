import { Component, OnInit } from '@angular/core';
import { IBird } from './bird';
import { BirdService } from '../services/bird.service';

@Component({
    moduleId: module.id,
    templateUrl: 'bird-list.component.html',
    styleUrls: ['bird-list.component.css']
})
export class BirdListComponent implements OnInit {
    pageTitle: string = 'Bird List';
    imageWidth: number = 100;
    imageMargin: number = 2;
    listFilter: string = "";
    errorMessage: string = "";

    birds: IBird[];

    constructor(private birdService: BirdService) {
        this.birds = new Array<IBird>();
    }

    ngOnInit(): void {
        console.log('ngInit called');
        this.birdService.getBirds()
            .subscribe(
            birds => {
                console.log('hello');
                this.birds = birds;
                console.log(birds);
            },
            error => {
                this.errorMessage = <any>error;
                console.log(error);
            }
            );
    }

    filterBirds(criteriaJSON: string): IBird[] {
        const birdsList = [
            {
                'Id': 1,
                'CommonName': 'Asian Paradise Flycatcher',
                'FeatherColor': 'Bluish grey',
                'Beak': 'Orange',
                'Description': 'Native to entire asia'
            },
            {
                'Id': 2,
                'CommonName': 'Green Bee Eater',
                'FeatherColor': 'Green',
                'Beak': 'Black',
                'Description': 'Eats so much bees, that its named after the act'
            },
            {
                'Id': 3,
                'CommonName': 'White breasted kingfisher',
                'FeatherColor': 'Blue',
                'Beak': 'Red',
                'Description': 'One of the five kingfishers in India, this one is the most common'
            }
        ];

        let selectedBirds: IBird[] = new Array<IBird>();
        /*
                if (this.birds === null) {
                    throw new Error('Bird data is null');
                } else {
                    console.log('Bird data is not null');
                    if (this.birds.length === 0) {
                        throw new Error('Bird data is not present');
                    }
                }
        */
        if (criteriaJSON != null) {

            // console.log(criteriaJSON);
            const selectionCriteria = JSON.parse(criteriaJSON);
            if (selectionCriteria.Beak !== undefined) {
                this.birds.forEach((b: IBird) => {
                    if (b.Beak === selectionCriteria.Beak) {
                        selectedBirds.push(b);
                    }
                });
            } else {
                console.error('Invalid criteria');
                throw Error('Invalid criteria');
            }
        } else {
            selectedBirds = birdsList;
        }
        return selectedBirds;
    }

}
