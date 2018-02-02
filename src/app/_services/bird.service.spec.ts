import { Http, HttpModule, RequestOptions, ResponseOptions, RequestMethod, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BirdService } from './bird.service';
import { async, TestBed, inject, getTestBed } from '@angular/core/testing';
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

    describe('Global List', () => {

        it('Returns array with 1400 elements',
            inject([BirdService, XHRBackend], (birdService, mockBackend) => {

                const species = birdService.getAllSpecies();
                expect(species.length).toBe(1400);

            }));

    });

    describe('My lists', () => {

        it('My list should have some species',
            inject([BirdService, XHRBackend], (birdService, mockBackend) => {

                const mockResponse = {
                    data: [
                        { Id: 0, CommonName: 'ABC', FeatherColor: '', Beak: '', Description: '' }
                    ]
                };

                mockBackend.connections.subscribe((connection) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

             const bs: BirdService =   getTestBed().get(BirdService);

                bs.getMySpecies().subscribe((mySpecies) => {
                    expect(mySpecies.length).toBeGreaterThan(0);
                    expect(mySpecies.length).toBe(1);
                    expect(mySpecies[0].CommonName).toEqual('ABC');
                    expect(mySpecies[0].CommonName).toEqual('ABCfsdfd1');
                });
            }));


        xit('Upon adding a new specie, the count of existing should increase',
            inject([BirdService, XHRBackend], (birdService, mockBackend) => {

                mockBackend.connections.subscribe((connection) => {
                    expect(connection.request.method).toBe(RequestMethod.Post);
                    connection.mockRespond(new Response(new ResponseOptions({status: 201})));
                });

                const bs: BirdService = getTestBed().get(BirdService);
                bs.addMySightingToTrip(234, 'ghdhyg').subscribe(
                    (successResult) => {
                      expect(successResult).toBeDefined();
                      expect(successResult.status).toBe(201);
                    });
            }));
    });
});
