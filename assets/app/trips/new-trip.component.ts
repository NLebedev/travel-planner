import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TripService } from './trip.service';
import { Trip } from './trip.model';
import * as $ from 'jquery';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

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

import { DatepickerModule } from 'angular2-material-datepicker'
@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html'
})
export class NewTripComponent implements OnInit {
  startDate: string;
  endDate: string;
  disableUntil: Object;
  disableSince: Object;
  showingErrors: boolean;
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
    let options = Object.assign({}, pickerOptions);
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
      this.tripService.addTrip(new Trip(
        this.tripForm.value.destination,
        this.startDate,
        this.endDate,
        this.tripForm.value.comment,
      ));
      this.clearForm();
    } else {
      this.showingErrors = true;
    }
  }

  ngOnInit() {
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