import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { TripComponent } from './trips/trip.component';
import { TripListComponent } from './trips/trip-list.component';
import { TripsComponent } from './trips/trips.component';
import { TripInputComponent } from './trips/trip-input.component';
import { TripFiltersComponent } from './trips/trip-filters.component';

import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { LogoutComponent } from './auth/logout.component';
import { SignupComponent } from './auth/signup.component';
import { SigninComponent } from './auth/signin.component';

import { AuthService } from './auth/auth.service';
import { TripService } from './trips/trip.service';
import { UserService } from './users/user.service';

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list.component';
import { UserComponent } from './users/user.component';
import { UserInputComponent } from './users/user-input.component';

import { PageNotFoundComponent } from './page-not-found.component';

import { AuthGuard } from './auth/auth.guard';
import { ManagerGuard } from './users/manager.guard';
import { AdminGuard } from './users/admin.guard';

import { routing } from './app.routing';

import { MyDatePickerModule } from 'mydatepicker';
import { MomentModule } from 'angular2-moment';
import { DropdownModule } from 'ng2-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripListComponent,
    TripsComponent,
    TripInputComponent,
    TripFiltersComponent,
    AuthenticationComponent,
    HeaderComponent,
    LogoutComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent,
    UsersComponent,
    UserListComponent,
    UserComponent,
    UserInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    MyDatePickerModule,
    MomentModule,
    HttpModule,
    DropdownModule
  ],
  providers: [AuthService, TripService, UserService, AuthGuard, ManagerGuard, AdminGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
