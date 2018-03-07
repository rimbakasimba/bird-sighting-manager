import { TestBed, async, inject } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { BirdDetailComponent } from './bird-detail.component';
import { BirdService } from './index';
import { IBird } from './index';
import { RouterLinkDirectiveStub } from '../router-stubs.module';

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

describe('BirdDetailComponent', () => {

  let detailComp: BirdDetailComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        BirdDetailComponent,
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
      const fixture = TestBed.createComponent(BirdDetailComponent);
      detailComp = fixture.debugElement.componentInstance;
    }
    )
  );

  it('Create BirdDetailComponent successfully', async(() => {
    expect(detailComp).toBeTruthy();
  }));

});
