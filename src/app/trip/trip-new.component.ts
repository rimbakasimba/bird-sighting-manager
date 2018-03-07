import { Component, OnInit } from '@angular/core';
import { TripService } from '../trip/trip.service';
import { Trip   } from '../trip/trip';
import { User } from '../user/index';

@Component({
    moduleId: module.id,
    templateUrl: 'trip-new.component.html'
})
export class MyNewTripComponent implements OnInit {

    ngOnInit() {

    }
}
