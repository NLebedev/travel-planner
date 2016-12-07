import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user.model';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
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
      const user = new User(this.myForm.value.email, this.myForm.value.password);
      
      this.authService.signin(user)
        .subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('uFirstName', data.user.firstName);
            localStorage.setItem('uid', data.user._id);
            localStorage.setItem('role', data.user.role);
            this.router.navigateByUrl('/trips');
          },
          error => {
            this.serverError = 'Login failed: ' + error.error.message;
            console.error(error);
          }
        );
      this.myForm.reset();
    }
  }

  ngOnInit() {
    this.showingErrors = false;
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
      ]),
      password: new FormControl(null, Validators.required)
    })
  }
}