import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <div class="logo-wrapper">
        <div class="logo">Travel Planner</div> 
      </div>
    <nav class="col-md-8 col-md-offset-2">
    </nav>
    </header>
  `,
  styles: [`
    .logo-wrapper {
      background-color: rgba(255,255,255,0.2);
      border-radius: 4px;
      padding: 9px;
      float: left;
    }
    .logo {
      background-color: rgba(255, 255, 255, 0.87);
      border-radius: 4px;
      padding: 10px;
      font-size: 13px;
      text-transform: uppercase;
    } 
  `]
})
      // <ul class="nav nav-pills">
      //   <li routerLinkActive="active"><a [routerLink]="['/trips']">Trips</a></li>
      //   <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
      // </ul>

export class HeaderComponent {

}