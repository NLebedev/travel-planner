var express = require('express');
var router = express.Router();

var Trip = require('../models/trip');

router.get('/', function(req, res, next) {
  Trip.find()
    .exec(function(err, trips) {
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

router.post('/', function (req, res, next) {
  var trip = new Trip({
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    comment: req.body.comment
  });
  trip.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved trip',
      obj: result
    });
  });
});

router.patch('/:id', function(req, res, next) {
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

module.exports = router;
