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
      <button type="button" class="btn btn-primary"
      (click)="onPrintDiv('trips')">
        Print trips
      </button>
      <app-trip-filters 
        (onStartFilter)="onStartFilter($event)"
        (onEndFilter)="onEndFilter($event)"
        (onDestinationFilter)="onDestinationFilter($event)"
      ></app-trip-filters>
      <div id="trips">
        <app-trip 
          *ngFor="let trip of filteredTrips"
          [trip]="trip" 
        >
        </app-trip>
      </div>
    </div>
  `,
})

export class TripListComponent implements OnInit {
  trips: Trip[];
  filteredTrips: Trip[];
  userId: string;
  startFilter: string = '0000-01-01';
  endFilter: string = '9999-12-31';
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

  
  onPrintDiv(divName) {
    let printContents = document.getElementById(divName).innerHTML;
    // remove links
    printContents = printContents.replace(new RegExp('>Edit<', 'g'), '><');
    printContents = printContents.replace(new RegExp('>Delete<', 'g'), '><');
    const popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
          <link rel='stylesheet' href='/stylesheets/style.css'/>
        </head>
        <body onload="window.print()">
        <h1>My trip list</h1>
        ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
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
