import { Component, OnInit,EventEmitter, Output} from '@angular/core';

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
  selector: 'app-trip-filters',
  templateUrl: './trip-filters.component.html',
  styleUrls: ['./trip-filters.component.css']
})
export class TripFiltersComponent implements OnInit {
  height: number = 0;
  buttonCaption: string = 'Show Filters';
  startDate: string = '';
  endDate: string = '';
  showingErrors: boolean = false;
  disableUntil: any = {};
  disableSince: any = {};
  filterDestination: string;
  @Output() onStartFilter = new EventEmitter<string>();
  @Output() onEndFilter = new EventEmitter<string>();
  @Output() onDestinationFilter = new EventEmitter<string>();
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

  destinationChanged(value:string) {
    this.onDestinationFilter.emit(value);
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

  printTripsForNextMonth(divName: string) {
    // filter trips
    const savedStart = this.startDate;
    const savedEnd = this.endDate;
    const now = moment().format('YYYY-MM-DD');
    const inAMonth = moment().add(1,'months').format('YYYY-MM-DD');
    this.startDate = now;
    this.onStartFilter.emit(this.startDate);
    
    this.endDate = inAMonth;
    this.onEndFilter.emit(this.endDate);
    setTimeout(() => {
      this.onPrintDiv(divName, `My trips from ${now} to ${inAMonth}`);
      this.startDate = savedStart;
      this.endDate = savedEnd;
      this.onStartFilter.emit(this.startDate);
      this.onEndFilter.emit(this.endDate);
    }, 200);
    
  }
  
  onPrintDiv(divName: string, header: string = 'My trips') {
    let printContents = document.getElementById(divName).innerHTML;
    // remove links
    printContents = printContents.replace(new RegExp('>Edit<', 'g'), '><');
    printContents = printContents.replace(new RegExp('>Delete<', 'g'), '><');
    const popupWin = window.open('', '_blank', 'width=300,height=300');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
          <link rel='stylesheet' href='/stylesheets/style.css'/>
        </head>
        <body onload="window.print()">
        <h1>${header}</h1>
        ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();
  } 
}