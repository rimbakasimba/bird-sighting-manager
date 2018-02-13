import { TestBed, async, inject } from '@angular/core/testing';
import { Http, HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { BirdDetailComponent } from './bird-detail.component';
import { BirdService } from './index';
import { IBird } from './index';

describe('BirdDetailComponent', () => {

  let detailComp: BirdDetailComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [
        BirdDetailComponent
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
