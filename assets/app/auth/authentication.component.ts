import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  template: `
    <header class="row spacing">
      <nav class="col-md-6 col-md-offset-3">
        <ul class="nav nav-pills">
        </ul>
      </nav>
    </header>
    <div class="row spacing">
      <router-outlet></router-outlet>
    </div>
  `
})
          // <li routerLinkActive="active"><a [routerLink]="['signup']">Signup</a></li>
          // <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
          // <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>

export class AuthenticationComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}