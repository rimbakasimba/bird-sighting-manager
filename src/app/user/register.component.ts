import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.createUser(this.model)
            .then((data) => {
                console.log(data);
                this.alertService.success('Registration successful', true);
                // alert('Successfully registered. Please login now');
                this.loading = false;
                this.router.navigate(['login']);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                this.alertService.error(error);
                this.loading = false;
            });
    }
}
