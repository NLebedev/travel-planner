import { Component } from '@angular/core';

@Component({
  selector: '/.app-page-not-found',
  template: `
    <div class="row">
      <div class="col-md-8 col-md-offset-2 content-container">
        <h1 class="not-found-header">
          Error 404: 
        </h1>
        <h2 class="not-found-followup">
          <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
          Page does not exist
        </h2>
      </div>
    </div>
  `,
  styles: [`
    .not-found-header {
      font-size: 60px;
    }
    .not-found-followup {
      text-align: center;
    }
    .content-container {
      margin-top: 200px;
    }
  `]
})

export class PageNotFoundComponent{}
