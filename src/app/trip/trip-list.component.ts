import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip/trip.service';
import { Trip   } from '../trip/trip';
import { User } from '../user/index';

@Component({
    moduleId: module.id,
    templateUrl: 'trip-list.component.html'
})
export class MyTripListComponent implements OnInit {

    private trips: Trip[];
    private errorMessage = '';
    private pageTitle = 'My Trips';

    constructor(private tripsService: TripService) {

    }

    ngOnInit(): void {
        console.log('ngInit called');

        const userIdCredentials = localStorage.getItem('currentUser');
        if (userIdCredentials) {
            const currentUser = JSON.parse(userIdCredentials) as User;
            if (currentUser) {
                this.tripsService.getMyTrips(currentUser.id)
                    .subscribe(
                    (trips) => this.trips = trips,
                    error => {
                        this.errorMessage = <any>error;
                        console.log(error);
                    }
                    );
            } else {
                alert('Please login');
            }
        } else {
            alert('Please login');
        }
    }
}
