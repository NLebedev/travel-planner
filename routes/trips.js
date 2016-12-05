var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Trip = require('../models/trip');

var ObjectId = require('mongoose').Types.ObjectId; 

// check authentication
router.use('/', function(req, res, next) {
  jwt.verify(req.headers.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  })
});

// get user trips
router.get('/user_trips/:id', function (req, res, next) {
  var decoded = jwt.decode(req.headers.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }

  // if request was sent not from admin and requesting other user's trips, deny
  User.findById(decoded.user._id, function(err, userSender) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    // restrict to admins and owned trips
    if (userSender.role !== 'admin' && req.params.id !== decoded.user._id) {
      return res.status(403).json({
        title: 'Access denied',
        error: {message: 'Restricted'}
      });
    }

    var userId = req.params.id || decoded.user._id;
    Trip.find({ user: new ObjectId(userId) }, function(err, trips) {
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
});

// create a trip
router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.headers.token);
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

// change a trip
router.patch('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.headers.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }
  
  User.findById(decoded.user._id, function(err, userSender) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
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
      
      // restrict to admins and owned trips
      if (userSender.role !== 'admin' && trip.user !== decoded.user._id) {
        return res.status(403).json({
          title: 'Access denied',
          error: {message: 'Restricted'}
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
    });
  });
});

router.delete('/:id', function(req, res, next) {
  var decoded = jwt.decode(req.headers.token);
  if (!decoded || !decoded.user || !decoded.user._id) {
    return res.status(500).json({
      title: 'Wrong token',
      error: {message: 'Provided token is wrong'}
    });
  }

  User.findById(decoded.user._id, function(err, userSender) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
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
      
      // restrict to admins and owned trips
      if (userSender.role !== 'admin' && trip.user !== decoded.user._id) {
        return res.status(403).json({
          title: 'Access denied',
          error: {message: 'Restricted'}
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
    });
  });
});




module.exports = router;
