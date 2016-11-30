import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { TripComponent } from './trips/trip.component';
import { TripListComponent } from './trips/trip-list.component';
import { TripsComponent } from './trips/trips.component';
import { NewTripComponent } from './trips/new-trip.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';
import { routing } from './app.routing';
//
import { MyDatePickerModule } from 'mydatepicker';

import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripListComponent,
    TripsComponent,
    NewTripComponent,
    AuthenticationComponent,
    HeaderComponent,
    LogoutComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [BrowserModule, FormsModule, routing, ReactiveFormsModule, MyDatePickerModule, MomentModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}