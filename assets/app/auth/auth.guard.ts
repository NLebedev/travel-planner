import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
// TODO: check token expiration: import { tokenNotExpired } from 'angular2-jwt/angular2-jwt'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {

    if (localStorage.getItem('token')) {
        // logged in so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/auth']);
    return false;
  }
}