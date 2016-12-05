import { Component, OnInit,EventEmitter, Output} from '@angular/core';

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

  fruitName: string;
  fruits: any[] = [
    {
      id: 1,
      name: "Apple",
      searchText: "apple"
    },
    {
      id: 2,
      name: "Orange",
      searchText: "orange"
    },
    {
      id: 3,
      name: "Banana",
      searchText: "banana"
    }
  ];

  selectedFruit: any = this.fruits[0];

  public fruitSelected(fruit) {
    this.fruitName = fruit ? fruit.name : 'none';
  }



}