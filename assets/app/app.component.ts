import { Component } from '@angular/core';

import { TripService } from './trips/trip.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TripService]
})
export class AppComponent {
  
}