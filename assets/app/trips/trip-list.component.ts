import { Component, OnInit } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';
import { TripFiltersComponent } from './trip-filters.component';
import { Router, ActivatedRoute, Params } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-trip-list',
  styleUrls: ['./trips-list.component.css'],
  template: `
    <div class="col-md-8 col-md-offset-2">
      <app-trip-filters 
        (onStartFilter)="onStartFilter($event)"
        (onEndFilter)="onEndFilter($event)"
        (onDestinationFilter)="onDestinationFilter($event)"
      ></app-trip-filters>
      <app-trip 
        *ngFor="let trip of filteredTrips"
        [trip]="trip" 
      >
      </app-trip>
    </div>
  `,
})

export class TripListComponent implements OnInit {
  trips: Trip[];
  filteredTrips: Trip[];
  userId: string;
  startFilter: string;
  endFilter: string;
  destinationFilter: string;
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  filterTrips(trips: Trip[]) {
    if (!trips) return [];
    let filtered = [];
    for (let trip of trips) {
      const startFilter = this.startFilter || '0000-01-01';
      const endFilter = this.endFilter || '9999-12-31';
      const startFilterDate = moment(startFilter);
      const endFilterDate = moment(endFilter);
      const tripStartDate = moment(trip.startDate);
      if (startFilterDate.diff(tripStartDate) <= 0 
        && endFilterDate.diff(tripStartDate) >= 0
        && trip.destination.includes(this.destinationFilter)
      ) {
        filtered.push(trip);
      }

    }
    return filtered;
  }

  onStartFilter(filter: string) {
    this.startFilter = filter;
    this.filteredTrips = this.filterTrips(this.trips);
  }

  onEndFilter(filter: string) {
    this.endFilter = filter;
    this.filteredTrips = this.filterTrips(this.trips);
  }

  onDestinationFilter(filter: string) {
    this.destinationFilter = filter;
    this.filteredTrips = this.filterTrips(this.trips);
  }

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
      .subscribe((trips: Trip[]) => {
        this.trips = trips;
        this.filteredTrips = trips;
      });

  }
}
