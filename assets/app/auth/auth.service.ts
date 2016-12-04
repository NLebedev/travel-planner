import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';

import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  user = new EventEmitter<User>();
  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/api/users', body, { headers })
      .map((response: Response) => {
        const res = response.json();
        this.user.emit(res.user);
        console.log('successssss', res.user);
        return res;
      })
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
        const res = response.json();
        this.user.emit(res.user);
        console.log('successssss', res.user);
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
    this.user.emit(null);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}
