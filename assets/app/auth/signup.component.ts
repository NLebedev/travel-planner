import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  showingErrors: boolean;
  serverError: string;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
   if (!this.myForm.valid) {
      console.log('form not valid!');
      this.showingErrors = true;
      this.serverError = '';
    } else {
      this.showingErrors = false;
      console.log(this.myForm);
      const user = new User(
        this.myForm.value.email,
        this.myForm.value.password,
        this.myForm.value.firstName,
        this.myForm.value.lastName,
      );
      this.authService.signup(user)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('uFirstName', data.user.firstName);
            localStorage.setItem('uid', data.user._id);
            localStorage.setItem('role', data.role);
            this.router.navigateByUrl('/trips');
          },
          error => {
            this.serverError = 'Signup failed: ' + error.error.message;
            console.error(error);
          }
        );
      this.myForm.reset();
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]{2,10}')
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]{2,10}')
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(2)
      ])
    });
  }
}