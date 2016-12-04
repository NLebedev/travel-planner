import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { User } from './../auth/user.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class UserService {
  private users: User[] = [];
  userToEdit: User;
  constructor(private http: Http) {

  }

  getUsers() {
      const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
      return this.http.get('http://localhost:3000/api/users', {headers})
      .map((response: Response) => {
        const users = response.json().obj;
        let transformedUsers: User[] = [];
        for (let user of users) {
          transformedUsers.push(new User(
            user.email,
            null,
            user.firstName,
            user.lastName,
            user._id,
            user.role
          ));
        }
        this.users = transformedUsers;
        return transformedUsers;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateUser(user: User) {
    console.log('got this user in update', user);
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.patch('http://localhost:3000/api/users/' + user.userId, body, {headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteUser(user: User) {
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.delete('http://localhost:3000/api/users/' + user.userId, {headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

}