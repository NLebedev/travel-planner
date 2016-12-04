import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  firstName: string;
  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/api/users', body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    console.log('signing in');
    return this.http.post('http://localhost:3000/api/users/signin', body, { headers })
      .map((response: Response) => {
        console.log('response after sign in', response.json());
        const res = response.json();
        if (res.user) {
          this.firstName = res.user.firstName || this.firstName;
        }
        return response.json();
      })
      .catch((error: Response) => {
        console.log('Error is', error);
        console.log('I am here', error.json());
        return Observable.throw(error.json());
      });
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
