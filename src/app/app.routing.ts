import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './user/index';
import { RegisterComponent } from './user/index';
import { AuthGuard } from './_guards/index';
import { BirdListComponent } from './birds/bird-list.component';
import { MyTripListComponent } from './trip/trip-list.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'birds', component: BirdListComponent },
    { path: 'trips', component: MyTripListComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
