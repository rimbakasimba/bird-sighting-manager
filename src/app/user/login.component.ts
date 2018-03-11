import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../user/authentication.service';
import { UserService } from '../user/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.userService.login(this.model.username, this.model.password)
            .then((data) => {     /*  Need an aero function here as regular callback wil have 'this' as the Promise itself  */
                console.log('User logged in successfully, with details ', data.uid);
                localStorage.setItem('currentUserFirebase', data.uid);
                this.router.navigate([this.returnUrl]);
                this.loading = true;
            })
            .catch((error) => {
                console.log(error);
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
