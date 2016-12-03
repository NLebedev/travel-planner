import { Component, Input, OnInit } from '@angular/core';
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

  upcomingTrip: boolean;
  visible: boolean;

  constructor(private tripService: TripService, private router: Router) {

  }

  onEdit() {
    this.tripService.tripToEdit = this.trip;
    this.router.navigateByUrl('/trips/form');
  }

  onDelete() {
    this.tripService.deleteTrip(this.trip)
      .subscribe(result => console.log('deletion result:',result));
    this.visible = false; 
  }

  ngOnInit() {
    this.visible = true;
    var now = moment();
    if (now.diff(this.trip.startDate) < 0) {
      this.upcomingTrip = true;
    } else {
      this.upcomingTrip = false;
    }
  }
}