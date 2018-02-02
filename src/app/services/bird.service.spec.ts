import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BirdService } from './bird.service';
import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

describe('Bird Service', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({

            declarations: [

            ],
            imports: [
                HttpClientModule,
                HttpModule
            ],
            providers: [
                HttpClient,
                { provide: XHRBackend, useClass: MockBackend },
                BirdService     /* We are testing bird service so its instance should be available */
            ]
        }).compileComponents();

    }));

    describe('Existance of service', () => {

        it('Should exist', () => {

        });
    });


    describe('Global List', () => {

        it ('Returns array with 1400 elements', inject([BirdService], (birdService) => {
           const species = birdService.GetAllSpecies();
           expect(species.length).toBe(1400);

        }));

    });

    describe('My lists', () => {

        it ()
    });

});
