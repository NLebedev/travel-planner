import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import jwt from 'jsonwebtoken';

@Component({
  selector: 'app-header',
  template: `
    <header class="row">
      <div class="logo-wrapper" (click)="onClick()">
        <div class="logo">
          <i class="fa fa-globe" aria-hidden="true"></i> 
          Travel Planner
        </div> 
      </div>
      <div class="profile" *ngIf="firstName">
        <i class="fa fa-user-circle" aria-hidden="true"></i>
        Hi, {{ firstName }}
        <i class="fa fa-caret-down" aria-hidden="true"></i>
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
      cursor: pointer;
    }
    .logo-wrapper:hover {
      color: #714c4c;
    }
    .logo {
      background-color: rgba(255, 255, 255, 0.87);
      border-radius: 4px;
      padding: 10px;
      font-size: 13px;
      text-transform: uppercase;
    }
    .profile {
      float: right;
      color: rgb(199,199,199);
      margin-right: 50px;
      font-size: 14px;
      cursor: pointer;
    }
    
  `]
})
      // <ul class="nav nav-pills">
      //   <li routerLinkActive="active"><a [routerLink]="['/trips']">Trips</a></li>
      //   <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
      // </ul>

export class HeaderComponent implements OnInit {
  firstName: string;
  constructor(private router: Router, private authService: AuthService) {}

  onClick() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.firstName = 'Yo';
    
    console.log('first name', this.authService.firstName);
  }

}