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

export class AuthenticationComponent {

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}