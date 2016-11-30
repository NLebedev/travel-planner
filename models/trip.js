var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  destination: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  comment: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Trip', schema);