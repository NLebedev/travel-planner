import { Routes } from '@angular/router';
import { TripListComponent } from './trip-list.component';
import { NewTripComponent } from './new-trip.component';

export const TRIPS_ROUTES: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TripListComponent },
  { path: 'new', component: NewTripComponent },
];
