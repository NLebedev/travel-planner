import { Component, Input } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  template: ``,
  styles: [``]
})

export class UserComponent {
  @Input() user: User;

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
   
}