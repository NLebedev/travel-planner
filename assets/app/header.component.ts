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
            <li><a (click)="onLogout()" class="logout">Logout</a></li>
            <li><a (click)="onUsers()" *ngIf="user?.role !== 'user'">Admin panel</a></li>
        </ul>
      </div>
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
    .admin-btn {
      position: absolute;
      right: 138px;
      top: 73px;
      // color: #d9534f;
    }
    li {
      text-align: right;
    }
    
  `]
})

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
    this.router.navigateByUrl('/auth/signin');
  }

}