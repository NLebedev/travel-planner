import { Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserInputComponent } from './user-input.component';

export const USERS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: UserListComponent },
  { path: 'form', component: UserInputComponent },
];
