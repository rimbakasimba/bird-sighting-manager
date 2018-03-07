import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './user/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AuthenticationService]
})
export class AppComponent implements OnInit {
  userName: string;
  public isUserLoggedIn: boolean = false;
  title = 'Bird List Manager';

  constructor(
      private _authService: AuthenticationService,
      private _route: Router) {
  }

  ngOnInit(): void {
      // Setup a subscription so our variable will know the latest status of login
      this._authService.isLoggedIn().subscribe(status => this.isUserLoggedIn = status);
  }

  logoutClicked(event: Event): void {
      event.preventDefault();
      // Call your service method to logout the user
      this._authService.logout();
      // Redirect back to welcome page
      this._route.navigate(['/welcome']);
  }
}
