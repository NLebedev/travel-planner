import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { TripService } from './trip.service';
import { Trip } from './trip.model';

import * as moment from 'moment';

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

  editedTrip: Trip;
  header: string;


  constructor(private tripService: TripService, private _location: Location) {
  }

  ngOnInit() {
    // initialize variables
    this.created = false;
    this.disableUntil = {};
    this.disableSince = {};
    this.showingErrors = false;
    // create formgroup
    this.tripForm = new FormGroup({
      destination: new FormControl(null, Validators.required),
      comment: new FormControl(null, [])
    });
    // get trip that we need to edit
    this.editedTrip = this.tripService.tripToEdit;
    // delete it from the service so that we don't see it next time
    this.tripService.tripToEdit = null;
    console.log('Inside input, trip is', this.editedTrip);
    // set header
    this.header = this.editedTrip ? 'Edit trip' : 'New trip'; 
    // set start and end date for edited trip
    this.startDate = this.editedTrip ? moment(this.editedTrip.startDate).format('YYYY-MM-DD') : '';
    this.endDate = this.editedTrip ? moment(this.editedTrip.endDate).format('YYYY-MM-DD') : '';
  }

  startDateChanged(event:any) {
    this.disableUntil = event.date;
    this.startDate = event.formatted;
  }

  endDateChanged(event:any) {
    this.disableSince = event.date;
    this.endDate = event.formatted;
    console.log('new end date', this.endDate);
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

  onSubmit(form: NgForm) {
    
    const trip = new Trip(
      this.tripForm.value.destination,
      this.startDate,
      this.endDate,
      this.tripForm.value.comment,
    );
    
    if (this.formValid()) {
      if (this.editedTrip) {
      // Edit
        trip.tripId = this.editedTrip.tripId;
        console.log('trip before update', trip);
        this.tripService.updateTrip(trip)
          .subscribe(
            result => {
              console.log(result);
              this.editedTrip = null;  
              this._location.back();
            }
          );
      } else {
      // Create
        // console.log('about to send', trip);
        this.tripService.addTrip(trip)
          .subscribe(
            data => {
              console.log(data);
              this.created = true;
            },
            error => console.error(error)
          );
      }

      this.clearForm();
    } else {
      // form contains errors
      this.showingErrors = true;
      this.created = false;
    }
  }

  onCancel() {
    this._location.back();
  }


}