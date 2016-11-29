import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from './trip.service';
import { Trip } from './trip.model';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html'
})
export class NewTripComponent implements OnInit {
  constructor(private tripService: TripService) {

  }

  tripForm: FormGroup;

  onSubmit() {
    // console.log(this.tripForm);
    // console.log(this.tripForm.value);
    this.tripService.addTrip(new Trip(
      this.tripForm.value.destination,
      this.tripForm.value.startDate,
      this.tripForm.value.endDate,
      this.tripForm.value.comment,
    ));
    this.tripForm.reset();
  }

  ngOnInit() {
    this.tripForm = new FormGroup({
      destination: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
      comment: new FormControl(null, [])
    });
  }

}