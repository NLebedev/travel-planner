import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class ManagerGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('role') === 'manager' || localStorage.getItem('role') === 'admin') {
      return true;
    }
    this.router.navigate(['/trips']);
    return false;
  }
}