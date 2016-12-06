var fs = require('fs');
var User = require('./models/user.js');
var Trip = require('./models/trip.js');
var bcrypt = require('bcryptjs');
var newUser = {};
var config = require('config');
var mongoose = require('mongoose');
mongoose.connect(config.DBHost);
// Step 1: Drop old data
User.remove({}, function(err) {
  console.log('Old users removed');
})
.then(function(){
  Trip.remove({}, function(err) {
    console.log('Old trips removed');
  })
})
.then(function(){
  //read data from file
  fs.readFile('./data.json', 'utf8', function(err, data) {
    if (err) {
      console.log('error reading data:', err);
    } else {
      data = JSON.parse(data);

      //save data into db
      for (var i = 0; i < data.length; i++) {
        var user = data[i];
        user.password =  bcrypt.hashSync(user.password, 10),
        new User(user).save(function(err, res){
          if (err) { return console.log('error creating user', err)}
          console.log('New user added');
        });
      }
    }
  });
}); 