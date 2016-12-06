var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
  destination: {type: String, required: true, minlength: 2, maxlength: 15},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  comment: {type: String, maxlength: 140},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  createdAt: { type: Date, default: Date.now }   
});

schema.post('remove', function(trip) {
  User.findById(trip.user, function(err, user) {
    user.trips.pull(trip);
    user.save();
  });
});

module.exports = mongoose.model('Trip', schema);
