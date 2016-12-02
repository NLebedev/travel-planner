var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  destination: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  comment: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function(trip) {
  User.findById(trip.user, function(err, user) {
    user.trips.pull(trip);
    user.save();
  });
});

module.exports = mongoose.model('Trip', schema);
