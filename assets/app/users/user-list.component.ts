import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  styleUrls: ['./users-list.component.css'],
  template: `
    <div class="col-md-8 col-md-offset-2">
      <div class="content-container">
        <app-user 
            *ngFor="let user of users"
            [user]="user" 
          >
        </app-user>
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

