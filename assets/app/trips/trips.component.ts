import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  template: `
  <header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
      <ul class="nav nav-pills list-centered">
        <li routerLinkActive="active"><a [routerLink]="['list']">All trips</a></li>
        <li routerLinkActive="active"><a [routerLink]="['form']">Create new trip</a></li>
      </ul>
    </nav>
  </header>
  <div class="row spacing">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [`
    .container {
    width: 600px;
    }
    .list-centered {
        margin: 0 auto;
        width: -webkit-fit-content;
           width: -moz-fit-content;
                width: fit-content;
    }
    .list-centered li {
        float: left;
    }
  `]
})

export class TripsComponent {

}



