import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './auth/user.model';
import { AuthService } from './auth/auth.service';

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
      <div class="dropdown" dropdown>
        <div class="profile" *ngIf="user?.firstName" dropdown-open>
          <i class="fa fa-user-circle" aria-hidden="true"></i>
          Hi, {{ user.firstName }}
          <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <ul class="dropdown-menu">
            <li><a href="#">Profile</a></li>
            <li><a (click)="onLogout()">Logout</a></li>
        </ul>
      </div>
      <a (click)="onUsers()" >Users</a>
 
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
    .dropdown-menu {
      text-align: center;
      float: right;
      position: absolute;
      top: 25px;
      right: 36px;
      left: initial;
      min-width: 105px;
    }
    
  `]
})
      // <ul class="nav nav-pills">
      //   <li routerLinkActive="active"><a [routerLink]="['/trips']">Trips</a></li>
      //   <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
      // </ul>

export class HeaderComponent implements OnInit {
  user: User;
  constructor(private router: Router, private authService: AuthService) {}

  onClick() {
    this.router.navigateByUrl('/');
  }

  onUsers() {
    this.router.navigateByUrl('/users');
  }

  ngOnInit() {
    this.user = new User(null, null, localStorage.getItem('uFirstName'));
    this.authService.user.subscribe(user => this.user = user);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth','signin'])
  }

}