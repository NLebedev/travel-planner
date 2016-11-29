import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `
  <header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
      <ul class="nav nav-pills">
        <li routerLinkActive="active"><a [routerLink]="['list']">All trips</a></li>
        <li routerLinkActive="active"><a [routerLink]="['new']">Create new trip</a></li>
      </ul>
    </nav>
  </header>
  <div class="row spacing">
    <router-outlet></router-outlet>
  </div>
  `
})

export class TripsComponent {

}