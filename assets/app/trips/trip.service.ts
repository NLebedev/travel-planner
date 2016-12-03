import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Trip } from './trip.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class TripService {
  private trips: Trip[] = [];
  tripToEdit: Trip;
  constructor(private http: Http) {

  }

  addTrip(trip: Trip) {
    const body = JSON.stringify(trip);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://localhost:3000/api/trips' + token, body, {headers})
      .map((response: Response) => {
        const result = response.json();
        const trip = new Trip(
          result.obj.destination,
          result.obj.startDate,
          result.obj.endDate,
          result.obj.comment,
          result.obj._id,
          result.obj.user._id);
        this.trips.push(trip);
        console.log('trips after adding', this.trips)
        return trip;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getTrips() {
    console.log('i am here before getting trip');
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('http://localhost:3000/api/trips/user_trips' + token)
      .map((response: Response) => {
        console.log('inside map, response is', response.json());
        
        const trips = response.json().obj;
        console.log('after response json');
        let transformedTrips: Trip[] = [];
        console.log('i am here', trips);
        for (let trip of trips) {
          transformedTrips.push(new Trip(
            trip.destination,
            trip.startDate,
            trip.endDate,
            trip.comment,
            trip._id,
            trip.user._id
          ));
        }
        console.log('i am here2');
        this.trips = transformedTrips;
        console.log('i am here3');
        console.log('got trips', transformedTrips);
        return transformedTrips;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateTrip(trip: Trip) {
    console.log('got this trip in update', trip);
    const body = JSON.stringify(trip);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.patch('http://localhost:3000/api/trips/' + trip.tripId + token, body, {headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteTrip(trip: Trip) {
    
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('http://localhost:3000/api/trips/' + trip.tripId + token)
      .map((response: Response) => {
        console.log('i am inside delete');
        this.trips.splice(this.trips.indexOf(trip), 1);
        response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

}