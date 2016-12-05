import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    this.router.navigate(['/trips']);
    return false;
  }
}