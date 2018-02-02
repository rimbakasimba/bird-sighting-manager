import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MockBackend } from '@angular/http/testing';
import { BirdListComponent } from './bird-list.component';
import { BirdService } from '../services/bird.service';
import { IBird } from './bird';

describe('BirdListComponent', () => {

  let listComp: BirdListComponent;
  let fixture: ComponentFixture<BirdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        BirdListComponent
      ],
      providers: [
        BirdService,
        { provide: Http, useClass: MockBackend }
      ]
    }).compileComponents();
  }));

  beforeEach(
    async(() => {
      fixture = TestBed.createComponent(BirdListComponent);
      listComp = fixture.debugElement.componentInstance;
    }
    )
  );

  it('Create BirdListComponent successfully', async(() => {
    expect(listComp).toBeTruthy();
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

      const criteria = JSON.stringify({ 'Beak': 'Black', 'year': 2017 });

      fixture.detectChanges(); // This triggers the ngOnInit

      const birdsMatchingCriteria = listComp.filterBirds(criteria);
      // console.log(birdsMatchingCriteria);
      expect(birdsMatchingCriteria.length).toBe(1);

    }));

    it('Pass a criteria which does not have a valid property and check for error', async(() => {
      const criteria = JSON.stringify({ 'Year': 2017 });

      // Have to wrap the called function in a function call in order to pass it to expect
      expect(function () { listComp.filterBirds(criteria); }).toThrowError('Invalid criteria');
    }));

    it('Pass a criteria which does not match the data and hence no item gets found', async(() => {
      const criteria = JSON.stringify({ 'Beak': 'White' });
      const birdsMatchingCriteria = listComp.filterBirds(criteria);
      // console.log(birdsMatchingCriteria);
      expect(birdsMatchingCriteria.length).toBe(0);
    }));
  });

});
