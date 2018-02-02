import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdService } from './_services/index';
import { TripService } from './_services/index';
import { AlertService } from './_services/index';
import { UserService } from './_services/index';
import { AuthenticationService } from './_services/index';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BirdListComponent,
        BirdDetailComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,

        RouterTestingModule.withRoutes(
          [
            {
              path: 'birds',
              component: BirdListComponent
            },
            {
              path: '**',
              redirectTo: 'birds',
              pathMatch: 'prefix'
            }
          ])
      ],
  providers: [
    HttpClient,
    BirdService,
    TripService,
    AlertService,
    UserService,
    AuthenticationService
  ],
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Bird List Manager'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Bird List Manager');
  }));
  /*
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Bird List Manager!');
  })); */
});
