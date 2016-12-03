import { Injectable } from '@angular/core';
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
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.post('http://localhost:3000/api/trips', body, {headers})
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
        return trip;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getTrips() {
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.get('http://localhost:3000/api/trips/user_trips', {headers})
      .map((response: Response) => {
        const trips = response.json().obj;
        let transformedTrips: Trip[] = [];
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
        this.trips = transformedTrips;
        console.log('got trips', transformedTrips);
        return transformedTrips;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateTrip(trip: Trip) {
    const body = JSON.stringify(trip);
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.patch('http://localhost:3000/api/trips/' + trip.tripId, body, {headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteTrip(trip: Trip) {
    const headers = new Headers({'Content-Type': 'application/json', token: localStorage.getItem('token')});
    return this.http.delete('http://localhost:3000/api/trips/' + trip.tripId, {headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

}