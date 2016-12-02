var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Trip = require('../models/trip');

var ObjectId = require('mongoose').Types.ObjectId; 

router.get('/user_trips', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }
  Trip.find({ user: new ObjectId(decoded.user._id) }, function(err, trips) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: trips
    })
  });
});

router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  })
});

router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }

    if (!user) {
      return res.status(500).json({
        title: 'No user found!',
        error: {message: 'User not found'}
      });
    }

    var trip = new Trip({
      destination: req.body.destination,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      comment: req.body.comment,
      user: user
    });
    trip.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      user.trips.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved trip',
        obj: result
      });
    });
  });
});


router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }
  Trip.findById(req.params.id, function(err, trip) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!trip) {
      return res.status(500).json({
        title: 'No trip found!',
        error: {message: 'Trip not found'}
      });
    }
    if (trip.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {message:'Users do not match'}
      });
    }
    trip.destination = req.body.destination;
    trip.startDate = req.body.startDate;
    trip.endDate = req.body.endDate;
    trip.comment = req.body.comment;
    trip.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated trip',
        obj: result
      });
    });
  })
});

router.delete('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }
  Trip.findById(req.params.id, function(err, trip) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!trip) {
      return res.status(500).json({
        title: 'No trip found!',
        error: {message: 'Trip not found'}
      });
    }
    if (trip.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: {error: {message:'Users do not match'}}
      });
    }
    trip.remove(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      res.status(200).json({
        message: 'Deleted trip',
        obj: result
      });
    });
  })
});



// TODO: only allow this route to admins
// router.get('/', function(req, res, next) {
//   Trip.find()
//     .populate('user', 'firstName')
//     .exec(function(err, trips) {
//       if (err) {
//         return res.status(500).json({
//           title: 'An error occured',
//           error: err
//         });
//       } 
//       res.status(200).json({
//         message: 'Success',
//         obj: trips
//       }) 
//     });
// });



module.exports = router;
