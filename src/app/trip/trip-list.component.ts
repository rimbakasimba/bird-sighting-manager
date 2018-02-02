import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'trip-list.component.html'
})
export class MyTripListComponent {

    constructor(private http: HttpClientModule) {
        
    }
    ngOnInit() {

    }
}
