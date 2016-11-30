import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from './trip.service';
import { Trip } from './trip.model';

const pickerOptions = {
  todayBtnTxt: 'Today',
  dateFormat: 'yyyy-mm-dd',
  firstDayOfWeek: 'mo',
  sunHighlight: true,
  height: '34px',
  width: '320px',
  inline: false,
  selectionTxtFontSize: '16px',
};

@Component({
  selector: 'app-trip-input',
  templateUrl: './trip-input.component.html'
})
export class TripInputComponent implements OnInit {
  startDate: string;
  endDate: string;
  disableUntil: Object;
  disableSince: Object;
  showingErrors: boolean;
  created: boolean;
  tripForm: FormGroup;

  constructor(private tripService: TripService) {
  }


  startDateChanged(event:any) {
    this.disableUntil = event.date;
    this.startDate = event.formatted;
  }

  endDateChanged(event:any) {
    this.disableSince = event.date;
    this.endDate = event.formatted;
  }

  createDatePickerOptions(mode) {
    let options = Object.assign({}, pickerOptions, {disableUntil: {}, disableSince: {}});
    if (mode === 'end') {
      options.disableUntil = this.disableUntil;
    } else {
      options.disableSince = this.disableSince;
    }
    return options;
  }

  clearForm() {
    this.tripForm.reset();
    this.endDate = '';
    this.startDate = '';
    this.showingErrors = false;
  }

  formValid() {
    if (this.endDate && this.startDate && this.tripForm.valid) return true;
    return false; 
  }

  onSubmit() {
    if (this.formValid()) {
      const trip = new Trip(
        this.tripForm.value.destination,
        this.startDate,
        this.endDate,
        this.tripForm.value.comment,
      );
      // console.log('about to send', trip);
      this.tripService.addTrip(trip)
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
      this.clearForm();
      this.created = true;
    } else {
      this.showingErrors = true;
      this.created = false;
    }
  }

  ngOnInit() {
    this.created = false;
    this.startDate = '';
    this.endDate = '';
    this.disableUntil = {};
    this.disableSince = {};
    this.showingErrors = false;
    this.tripForm = new FormGroup({
      destination: new FormControl(null, Validators.required),
      comment: new FormControl(null, [])
    });
  }

}