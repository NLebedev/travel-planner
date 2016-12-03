import { Routes, RouterModule } from '@angular/router';

import { TripsComponent } from './trips/trips.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { TRIPS_ROUTES } from './trips/trips.routes';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent, children: TRIPS_ROUTES },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
]; 

export const routing = RouterModule.forRoot(APP_ROUTES);
