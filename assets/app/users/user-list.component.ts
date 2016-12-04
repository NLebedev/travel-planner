import { Component, OnInit } from '@angular/core';
import { User } from '../auth/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <div class="content-container">
        <h1>User list</h1>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr app-user 
                *ngFor="let user of users"
                [user]="user" 
              >
            </tr>
           
          </tbody>
        </table>

        
      </div>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.users = users;
        }
      );
  }
}

