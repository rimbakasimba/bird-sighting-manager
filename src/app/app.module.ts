import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { AlertComponent } from './alert/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

import { AppComponent } from './app.component';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdService } from './birds/index';
import { TripService } from './trip/index';
import { AlertService } from './alert/index';
import { UserService } from './user/index';
import { AuthenticationService } from './user/index';
import { LoginComponent } from './user/index';
import { RegisterComponent } from './user/index';
import { HomeComponent } from './home/index';
import { MyTripListComponent } from './trip/trip-list.component';
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    BirdListComponent,
    BirdDetailComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MyTripListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],

  providers: [
    BirdService,
    AuthGuard,
    TripService,
    AlertService,
    UserService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
