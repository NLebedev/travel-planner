import { Component, Input } from '@angular/core';
import { User } from '../auth/user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-user]',
  template: `
    <td [hidden]="!visible">{{ user.firstName }}</td>
    <td [hidden]="!visible">{{ user.lastName }}</td>
    <td [hidden]="!visible">{{ user.email }}</td>
    <td [hidden]="!visible">{{ user.role }}</td>
    <td [hidden]="!visible">
      <a (click)="onView()" *ngIf="myRole === 'admin'">Trips</a>
      <a (click)="onDelete()" >Delete</a>
      <a (click)="onEdit()" >Edit</a>
    </td>
  `,
  styles: [`
    td {
      vertical-align: middle;
    }
  `]
})

export class UserComponent {
  @Input() user: User;
  myRole: string;
  visible: boolean = true;

  constructor(private userService: UserService, private router: Router) {

  }

  onEdit() {
    this.userService.userToEdit = this.user;
    this.router.navigateByUrl('/users/form');
  }

  onDelete() {
    this.userService.deleteUser(this.user)
      .subscribe(result => console.log('deletion result:', result));
    this.visible = false; 
  }

  onView() {
    this.router.navigate(['/trips/list', this.user.userId]);
  }
   
  ngOnInit() {
    this.myRole = localStorage.getItem('role');
  }
}