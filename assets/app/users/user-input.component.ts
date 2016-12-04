import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService } from './user.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-input.component.html',
  styles: [`
    .user-data-text {
      font-size: 18px;
      line-height: 1.9;
    }
    form {
      padding: 30px;
    }
    .form-group {
      margin-bottom: 5px;
    }
  `]
})
export class UserInputComponent implements OnInit {
  myForm: FormGroup;
  editing: any = {};

  constructor(private userService: UserService, private router: Router, private _location: Location) {}

  onSubmit() {
   console.log(this.myForm);
    const user = new User(
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.firstName,
      this.myForm.value.lastName,
      this.userService.userToEdit.userId,
    );
    this.userService.updateUser(user)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('uFirstName', data.obj.firstName);
          localStorage.setItem('uid', data.obj._id);
          this.router.navigateByUrl('/users');
        },
        error => console.error(error)
      );
    this.myForm.reset();
  }

  editClick(editField) {
    switch (editField) {
      case 'firstName': return this.editing.firstName = true;
      case 'lastName': return this.editing.lastName = true;
      case 'email': return this.editing.email = true;
      case 'password': return this.editing.password = true;
    }
  }

  onCancel() {
    this._location.back();
  }

  ngOnInit() {
    // if there is no user to edit, get back
    if (!this.userService.userToEdit) {
      this.myForm = new FormGroup({});
      return this.router.navigateByUrl('/users/list');
    }

    this.myForm = new FormGroup({
      firstName: new FormControl(this.userService.userToEdit.firstName, Validators.required),
      lastName: new FormControl(this.userService.userToEdit.lastName, Validators.required),
      email: new FormControl(this.userService.userToEdit.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

}