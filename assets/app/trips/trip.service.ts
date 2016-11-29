import { Trip } from './trip.model';

const mock_trips = [
  
]

export class TripService {
  private trips: Trip[] = [
    new Trip('Bali', '01/01/2017', '01/01/2018', 'This is going to be a cool trip' )
  ];

  addTrip(trip: Trip) {
    this.trips.push(trip);
    console.log(this.trips);
  }

  getTrips() {
    console.log('These are the trips', this.trips);
    return this.trips;
  }

  deleteTrip(trip: Trip) {
    this.trips.splice(this.trips.indexOf(trip), 1);
  }
}