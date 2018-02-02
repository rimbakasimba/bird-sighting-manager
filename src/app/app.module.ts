import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

import { AppComponent } from './app.component';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdService } from './_services/index';
import { TripService } from './_services/index';
import { AlertService } from './_services/index';
import { UserService } from './_services/index';
import { AuthenticationService } from './_services/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    BirdListComponent,
    BirdDetailComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
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
