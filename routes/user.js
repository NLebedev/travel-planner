var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

// get Users
router.get('/', function (req, res, next) {
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
    // restrict to admins and managers
    if (!userSender || (userSender.role != 'admin' && userSender.role != 'manager')) {
      return res.status(403).json({
        title: 'Access denied',
        error: {message: 'Restricted'}
      });
    }
    User.find({}, function(err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        });
      }
      // not sending the passwords
      users = users.map(function(user) {
        user.password = null;
        return user;
      });
      res.status(200).json({
        message: 'Success',
        obj: users
      })
    });
  });
});

// update user
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
    // restrict to admins and managers
    if (!userSender || (userSender.role != 'admin' && userSender.role != 'manager')) {
      return res.status(403).json({
        title: 'Access denied',
        error: {message: 'Restricted'}
      });
    }

    User.findById(req.params.id, function(err, user) {
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
      user.email = req.body.email || user.email;
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      
      // update role, but only if sent from admin
      if (userSender.role == 'admin') {
        user.role = req.body.role || user.role;
      }

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10)
      };

      user.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        res.status(200).json({
          message: 'Updated user',
          obj: result
        });
      });
    });
  });
});

// delete user
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
    // restrict to admins and managers
    if (!userSender || (userSender.role != 'admin' && userSender.role != 'manager')) {
      return res.status(403).json({
        title: 'Access denied',
        error: {message: 'Restricted'}
      });
    }

    User.findById(req.params.id, function(err, user) {
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
      user.remove(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occured',
            error: err
          });
        }
        res.status(200).json({
          message: 'Deleted user',
          obj: result
        });
      });
    });
  });  
});

// sign up
router.post('/', function (req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email.toLowerCase(),
    role: 'user'
  });
  if (req.body.password.length < 6) {
    return res.status(500).json({
        title: 'Password too short!',
        error: {message: 'Password too short'}
      });
  }
  user.save(function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    var token = jwt.sign(
      { user: user },
      'secret',
      { expiresIn: 7200 }
    );
    user.password = null;
    res.status(201).json({
      message: 'User created',
      token: token,
      user: user
    });
  });
});

// sign in
router.post('/signin', function (req, res, next) {
  User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      })
    }
    var token = jwt.sign(
      { user: user },
      'secret',
      { expiresIn: 7200 }
    );
    user.password = null;
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      user: user
    });

  });

});

module.exports = router;
