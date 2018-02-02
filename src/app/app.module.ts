import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { BirdService } from './services/bird.service';

@NgModule({
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

    RouterModule.forRoot([
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
    BirdService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
