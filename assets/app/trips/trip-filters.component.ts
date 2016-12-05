import { Component, OnInit,EventEmitter, Output } from '@angular/core';

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
  selector: 'app-trip-filters',
  template: `
    <div class="filters-container">
      <h1> Filters </h1>
      <div>
        <label for="startDate">Starts between:</label>
          <my-date-picker
            [options]="createDatePickerOptions('start')"
            (dateChanged)="startDateChanged($event)"
            [selDate]="startDate"
            id="startDate"
            class="formControl"
            >
          </my-date-picker>
          <div
            class="alert alert-danger alert-picker" *ngIf="!startDate && showingErrors"
          >
            Start date is not correct
          </div>
        <label for="endDate">and </label>
          <my-date-picker
            [options]="createDatePickerOptions('end')"
            (dateChanged)="endDateChanged($event)"
            [selDate]="endDate"
            id="endDate"
            class="formControl"
            >
          </my-date-picker>
          <div
            class="alert alert-danger alert-picker" *ngIf="!endDate && showingErrors"
          >
            Start date is not correct
          </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-container {
      background-color: #337ab7;
      color: #fff;
      padding: 13px;
      margin-bottom: 13px;
      border-radius: 4px;
    }
    label {
      vertical-align: top;
      line-height: 2.5;
    }
    .mydp {
      width: 150px;
    }
  `]
})
export class TripFiltersComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  showingErrors: boolean = false;
  disableUntil: any = {};
  disableSince: any = {};
  @Output() onStartFilter = new EventEmitter<string>();
  @Output() onEndFilter = new EventEmitter<string>();
  constructor() {}

  startDateChanged(event:any) {
    this.disableUntil = event.date;
    this.startDate = event.formatted;
    this.onStartFilter.emit(this.startDate);
  }

  endDateChanged(event:any) {
    this.disableSince = event.date;
    this.endDate = event.formatted;
    this.onEndFilter.emit(this.endDate);
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

  ngOnInit() {

  }
}