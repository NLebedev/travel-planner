import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list.component';
import { TripInputComponent } from './trip-input.component';


export const TRIPS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TripListComponent },
  { path: 'form', component: TripInputComponent },
];
