import { Component, OnInit } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trip-list',
  styleUrls: ['./trips-list.component.css'],
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-trip 
          *ngFor="let trip of trips"
          [trip]="trip" 
        >
        </app-trip>
    </div>
  `,
})
export class TripListComponent implements OnInit {
  trips: Trip[];

  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.getTrips()
      .subscribe(
        (trips: Trip[]) => {
          this.trips = trips;
        }
      );
  }
}

