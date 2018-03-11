import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// used to create fake backend
import { fakeBirdBackendProvider } from './_helpers/index';
import { fakeTripBackendProvider } from './_helpers/index';
import { fakeUserBackendProvider } from './_helpers/index';
import { AlertComponent } from './alert/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

import { AppComponent } from './app.component';
import { BirdAllSpecieListComponent } from './birds/bird-all-specie-list.component';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdListFilter} from './birds/bird-list.filter';
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
import { firebase } from '../environments/firebaseConfig';

@NgModule({
  declarations: [
    AppComponent,
    BirdAllSpecieListComponent,
    BirdListComponent,
    BirdDetailComponent,
    BirdListFilter,
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
    routing,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    fakeTripBackendProvider,
    fakeBirdBackendProvider,
    fakeUserBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
