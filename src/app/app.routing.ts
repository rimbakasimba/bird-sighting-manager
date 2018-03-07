import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './user/index';
import { RegisterComponent } from './user/index';
import { AuthGuard } from './_guards/index';
import { BirdListComponent } from './birds/bird-list.component';
import { BirdDetailComponent } from './birds/bird-detail.component';
import { MyTripListComponent } from './trip/trip-list.component';
import { MyNewTripComponent } from './trip/trip-new.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'birds', component: BirdListComponent },
    { path: 'birds/:id', component: BirdDetailComponent },
    { path: 'trips', component: MyTripListComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
