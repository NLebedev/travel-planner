import { Routes, RouterModule } from '@angular/router';

import { TripsComponent } from './trips/trips.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { TRIPS_ROUTES } from './trips/trips.routes';
import { AuthGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripsComponent, children: TRIPS_ROUTES, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
  { path: '**', component: PageNotFoundComponent},
]; 

export const routing = RouterModule.forRoot(APP_ROUTES);
