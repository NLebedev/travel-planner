import { Component } from '@angular/core';
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
  selector: 'app-new-trip',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <div class="content-container">
        <h2>Create New Trip</h2>
        <app-trip-input></app-trip-input>
      </div>
    </div>
  `
})

export class NewTripComponent{

}