import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from './trip.model';
import { TripService } from './trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent{
  @Input() trip: Trip;
  @Output() editClicked = new EventEmitter<string>();

  constructor(private tripService: TripService) {

  }

  onEdit() {
    this.editClicked.emit('A new value');
  }
  onDelete() {
    this.tripService.deleteTrip(this.trip)
      .subscribe(result => console.log(result));
  }
}