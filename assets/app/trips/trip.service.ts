import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Trip } from './trip.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@Injectable()

export class TripService {
  private trips: Trip[] = [];

  constructor(private http: Http) {

  }

  addTrip(trip: Trip) {
    const body = JSON.stringify(trip);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/trip', body, {headers})
      .map((response: Response) => {
        const result = response.json();
        const trip = new Trip(
          result.obj.destination,
          result.obj.startDate,
          result.obj.endDate,
          result.obj.comment,
          result.obj._id,
          null);
        this.trips.push(trip);
        return trip;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getTrips() {
    return this.http.get('http://localhost:3000/trip')
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
            null
          ));
        }
        this.trips = transformedTrips;
        console.log('got trips', transformedTrips);
        return transformedTrips;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteTrip(trip: Trip) {
    this.trips.splice(this.trips.indexOf(trip), 1);
    return this.http.delete('http://localhost:3000/trip/' + trip.tripId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

}