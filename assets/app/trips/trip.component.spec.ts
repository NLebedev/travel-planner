// import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
// import { Pipe, PipeTransform } from '@angular/core';
// import { By }              from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';
// import { TripService } from './trip.service';
// import { TripComponent } from './trip.component';
// import { Trip } from './trip.model';

// import { RouterTestingModule } from '@angular/router/testing';
// import { Routes } from '@angular/router';

// import { DifferencePipe } from '../../../node_modules/angular2-moment/difference.pipe'

// // moment pipe mock
// @Pipe({name: 'amDifference'})
// export class amDifferencePipe implements PipeTransform {
//   transform(value: string): string {
//     return value;
//   }
// }

// let tripService: any;
// let expectedTrip: Trip;
// let componentUserService: any;
// let comp:    TripComponent;
// let fixture: ComponentFixture<TripComponent>;
// let deTripDestination, deBtn:      DebugElement;
// let elTripDestination, elBtn:      HTMLElement;
// let tripServiceStub: {
//   isLoggedIn: boolean;
//   user: { 
//     firstName: string,
//     subscribe: any
//   };
// };

// // class RouterStub {
// //   navigateByUrl(url: string) { return url; }
// // }
// export const fake_routes: Routes = [
// // {path: 'home', component: MyComponent},
// ];

// export const ButtonClickEvents = {
//    left:  { button: 0 },
//    right: { button: 2 }
// };

// export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
//   if (el instanceof HTMLElement) {
//     el.click();
//   } else {
//     el.triggerEventHandler('click', eventObj);
//   }
// }


// describe('TripComponent', () => {
//   beforeEach(() => {
//     tripServiceStub = {
//       isLoggedIn: true,
//       user: { 
//         firstName: 'Test User',
//         subscribe: () => {}
//     },

//     };

//     // TestBed.overridePipe(amDifference, {set: DifferencePipe});

//     TestBed.configureTestingModule({
//       declarations: [ TripComponent ], // declare the test component
//       providers:    [ {provide: TripService, useValue: tripServiceStub }, DifferencePipe ],
//       imports: [RouterTestingModule.withRoutes(fake_routes)]
//     })
//       .compileComponents();
    

//     fixture = TestBed.createComponent(TripComponent);
//     comp    = fixture.componentInstance;

//     // // UserService actually injected into the component
//     tripService = fixture.debugElement.injector.get(TripService);
//     componentUserService = tripService;
//     // // TripService from the root injector
//     tripService = TestBed.get(TripService);

//     // query for the title <h1> by CSS element selector
//     deTripDestination = fixture.debugElement.query(By.css('trip-destination'));
//     elTripDestination = de.nativeElement;

//     deBtn = fixture.debugElement.query(By.css('.logout'));
//     elBtn = de.nativeElement;

//     expectedTrip = new Trip('Bali', '2016-12-12','2017-01-12', 'Trip comment', '1', '2');
//     comp.trip = expectedTrip;
//     fixture.detectChanges(); // trigger initial data binding

//   });
  
//   it('should display trip destination', () => {
//     const expectedDestination = expectedTrip.destination;
//     expect(elTripDestination.nativeElement.textContent).toContain(expectedDestination);
//   });




  
// });
