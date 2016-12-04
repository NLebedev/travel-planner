var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, requires: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
