import { Http, HttpModule, RequestOptions, ResponseOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TripService } from './index';
import { async, TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

describe('Trip Service', () => {

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
                TripService
            ]
        }).compileComponents();

    }));

    describe('My trips', () => {
/*
        it('Should return an array of trips',
            inject([TripService, XHRBackend], (tripService, mockTripBackend) => {

                const mockResponse = {
                    data: [
                    ]
                };

                mockTripBackend.connections.subscribe((connection) => {

                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                tripService.getMyTrips('rimba').subscribe((myTrips) => {
                    expect(myTrips.length).toBe(0);
                });

            })
        );

        it('Upon adding a new trip, get the newly created id',
            inject([TripService, XHRBackend], (tripService, mockBackend) => {

                const tripId: string = tripService.createTrip('delhi', '26-Jan-2018');
                expect(tripId.length).toBeGreaterThan(0);
            })
        );
         */
    });

});
