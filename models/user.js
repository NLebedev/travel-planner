var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var schema = new Schema({
  firstName: {type: String, required: true, minlength: 2, maxlength: 15},
  lastName: {type: String, required: true, minlength: 2, maxlength: 15},
  password: {type: String, required: true, minlength: 15},
  role: {type: String, required: true, minlength: 2, maxlength: 15, lowercase: true},
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}],
  createdAt: { type: Date, default: Date.now }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
