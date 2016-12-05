import { Component, OnInit } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

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
  userId: string;
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.route.params
    //   .switchMap((params: Params) => {
    //     this.userId = params['id'];
    //     console.log('user id', this.userId);
    //   });

    // // getting our trips
    // this.tripService.getTrips(this.userId)
    //   .subscribe(
    //     (trips: Trip[]) => {
    //       this.trips = trips;
    //     }
    //   );


    this.route.params
      .switchMap((params: Params) => this.tripService.getTrips(params['id']))
      .subscribe((trips: Trip[]) => this.trips = trips);

  }
}
