import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent{
  @Input() trip: Trip;
  @Output() editClicked = new EventEmitter<string>();

  constructor(private tripService: TripService, private router: Router) {

  }

  onEdit() {
    this.tripService.tripToEdit = this.trip;
    this.router.navigate(['/trips/form']);
  }

  onDelete() {
    this.tripService.deleteTrip(this.trip)
      .subscribe(result => console.log(result));
  }
}