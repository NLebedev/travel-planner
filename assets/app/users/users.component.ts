import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
  <header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
    </nav>
  </header>
  <div class="row spacing">
    <router-outlet></router-outlet>
  </div>
  `
})

export class UsersComponent {

}