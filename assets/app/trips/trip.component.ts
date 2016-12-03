import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  @Input() trip: Trip;
  @Output() editClicked = new EventEmitter<string>();

  upcomingTrip: boolean;

  constructor(private tripService: TripService, private router: Router) {

  }

  onEdit() {
    this.tripService.tripToEdit = this.trip;
    this.router.navigateByUrl('/trips/form');
  }

  onDelete() {
    this.tripService.deleteTrip(this.trip)
      .subscribe(result => console.log(result));
  }

  ngOnInit() {
    var now = moment();
    if (now.diff(this.trip.startDate) < 0) {
      this.upcomingTrip = true;
    } else {
      this.upcomingTrip = false;
    }
  }
}