import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-trip',
  template: `
    <div class="col-md-8 col-md-offset-2">
      <div class="content-container">
        <h2>Edit trip</h2>
        <app-trip-input></app-trip-input>
      </div>
    </div>
  `
})
export class EditTripComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    
  }
}