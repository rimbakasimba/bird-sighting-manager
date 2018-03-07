import { TestBed, async, inject, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MockBackend } from '@angular/http/testing';
import { BirdListComponent } from './bird-list.component';
import { BirdService } from './index';
import { IBird } from './index';

import { RouterLinkDirectiveStub } from '../router-stubs.module';

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('BirdListComponent', () => {

  let listComp: BirdListComponent;
  let fixture: ComponentFixture<BirdListComponent>;
  const timeout = 200;    // response timeout

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        BirdListComponent,
        RouterLinkDirectiveStub,
        RouterOutletStubComponent
      ],
      providers: [
        BirdService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(BirdListComponent);
      listComp = fixture.debugElement.componentInstance;

      fixture.detectChanges();     // This triggers the ngOnInit
    }
    )
  );

  it('Create BirdListComponent successfully', async(() => {
    expect(listComp).toBeTruthy();
  }));

  it('Should have some birds fetched upon initialization', async(() => {

    setTimeout(() => {
      const birds = listComp.birds;
      expect(birds.length).toBeGreaterThan(0);
    }, timeout);

  }));

  /*
    it('Should have a array collection of type IBird', async(() => {
         expect(listComp.birds instanceof IBird).toBe(true);
    }));  */

  describe('Testing filterBirds method', () => {
    it('Should have a method named filterBirds', async(() => {

      expect(listComp.filterBirds).toBeDefined();
    }));

    it('Pass a specific criteria which the collection meets and check returned element', async(() => {

      setTimeout(() => {

        const criteria = JSON.stringify({ 'Beak': 'Black' });

        const birdsMatchingCriteria = listComp.filterBirds(criteria);
        console.log(birdsMatchingCriteria);
        expect(birdsMatchingCriteria.length).toBe(1);
      }, timeout);
    }));

    it('Pass a criteria which does not have a valid property and check for error', async(() => {
      const criteria = JSON.stringify({ 'Year': 2017 });
      setTimeout(() => {
        // Have to wrap the called function in a function call in order to pass it to expect
        expect(function () { listComp.filterBirds(criteria); }).toThrowError('Invalid criteria');
      }, timeout);
    }));

    it('Pass a criteria which does not match the data and hence no item gets found', async(() => {
      const criteria = JSON.stringify({ 'Beak': 'White' });
      setTimeout(() => {
        const birdsMatchingCriteria = listComp.filterBirds(criteria);
        console.log(birdsMatchingCriteria);
        expect(birdsMatchingCriteria.length).toBe(0);
      }, timeout);
    }));
  });

});
