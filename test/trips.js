//During the test the env variable is set to test
var Promise = require("bluebird");
process.env.NODE_ENV = 'test';
var jwt = require('jsonwebtoken');
var mongoose = require("mongoose");
var User = require('../models/user');
var bcrypt = require('bcryptjs');
//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

// closure variables
var user;
var manager;
var admin;
var newUser;
var token;

var userId;
var managerId;
var adminId;

var setUsers = function() {
  user = new User({
    firstName: 'Alice',
    lastName: 'Liddel',
    email: 'alice@wonderland.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'user'
  });
  manager = new User ({
    firstName: 'Rabbit',
    lastName: 'White',
    email: 'rabbit@wonderland.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'manager'
  });
  admin = new User ({
    firstName: 'Lewis',
    lastName: 'Caroll',
    email: 'lewis@wonderland.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin'
  });
};

var authenticateUser = function(email, password, callback) {
  chai.request(server)
    .post('/api/users/signin')
    .send({email: email, password: password})
    .end(function(err, res) {
      token = res.body.token;
      callback(err,res);
    })
}

describe('Trips', function() {
  beforeEach(function(done) { //Before each test we empty the database
    setUsers();
    User.remove({}, function() {})
      .then(function(){return user.save(function(err,res){ userId = res._id});})
      .then(function(){return manager.save(function(err,res){managerId = res._id});})
      .then(function(){return admin.save(function(err,res){ adminId = res._id; done();});})   
  })           

  describe('/api/trips/user_trips/:id GET: GET USER TRIPS', function() {
    it('should allow user to view his trips', function(done) {
      //authenticate user 
      chai.request(server)
        .post('/api/users/signin')
        .send({email: user.email, password: '123456'})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.not.have.property('error');
          res.body.user.should.have.property('firstName').eql(user.firstName);
          token = res.body.token;
          userId = res.body.user._id;
          // get trips
          chai.request(server)
            .get('/api/trips/user_trips/' + userId)
            .set({token: token})
            .send()
            .end(function(err, res) {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.not.have.property('error');
              done();
            });
        });
    });

    it('should allow admin to view all trips', function(done) {
      //authenticate user 
      authenticateUser(admin.email, '123456', function(err, res){
        chai.request(server)
          .get('/api/trips/user_trips/' + managerId)
          .set({token: token})
          .send()
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should NOT allow managers to view all trips', function(done) {
      //authenticate user 
      authenticateUser(manager.email, '123456', function(err, res){
        chai.request(server)
          .get('/api/trips/user_trips/' + adminId)
          .set({token: token})
          .send()
          .end(function(err, res) {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Access denied');
            res.body.should.have.property('error');
            done();
          });
      })
    });

    it('should NOT allow users to view all trips', function(done) {
      //authenticate user 
      authenticateUser(user.email, '123456', function(err, res){
        chai.request(server)
          .get('/api/trips/user_trips/' + managerId)
          .set({token: token})
          .send()
          .end(function(err, res) {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Access denied');
            res.body.should.have.property('error');
            done();
          });
      })
    });

  });

  describe('/api/trips/ POST: CREATE TRIP', function() {
    it('should allow users to create a trip', function(done) {
      //authenticate user 
      chai.request(server)
        .post('/api/users/signin')
        .send({email: user.email, password: '123456'})
        .end(function(err, res) {
          token = res.body.token;
          userId = res.body.user._id;
          // post a trip
          chai.request(server)
            .post('/api/trips/')
            .set({token: token})
            .send({startDate: '2016-11-11', endDate: '2016-12-12', destination: 'Wonderland'})
            .end(function(err, res) {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.not.have.property('error');
              res.body.obj.should.have.property('destination').eql('Wonderland');
              done();
            });
        });
    });

    it('should not allow users to create a trip with empty destination', function(done) {
      //authenticate user 
      chai.request(server)
        .post('/api/users/signin')
        .send({email: user.email, password: '123456'})
        .end(function(err, res) {
          token = res.body.token;
          userId = res.body.user._id;
          // post a trip
          chai.request(server)
            .post('/api/trips/')
            .set({token: token})
            .send({startDate: '2016-11-11', endDate: '2016-12-12', destination: ''})
            .end(function(err, res) {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.have.property('error');              
              done();
            });
        });
    });
  });

  describe('/api/trips/ PATCH: CHANGE USER TRIP', function() {
    it('should allow users to change a trip', function(done) {
      //authenticate user 
      chai.request(server)
        .post('/api/users/signin')
        .send({email: user.email, password: '123456'})
        .end(function(err, res) {
          token = res.body.token;
          var userId = res.body.user._id;
          // post a trip
          chai.request(server)
            .post('/api/trips/')
            .set({token: token})
            .send({startDate: '2016-11-11', endDate: '2016-12-12', destination: 'Wonderland'})
            .end(function(err, res) {
              // change a trip
              var tripId = res.body.obj._id;
              chai.request(server)
                .patch('/api/trips/'+ tripId)
                .set({token: token})
                .send({startDate: '2016-12-13', endDate: '2016-12-13', destination: 'Home'})
                .end(function(err, res) {
               //     console.log('response', res);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
                  res.body.should.not.have.property('error');
                  res.body.obj.should.have.property('destination').eql('Home');
                  done();
                });
            });
        });
    });
  });
  describe('/api/trips/ DELETE: DELETE USER TRIPS', function() {
    it('should allow users to delete their trips', function(done) {
      //authenticate user 
      chai.request(server)
        .post('/api/users/signin')
        .send({email: user.email, password: '123456'})
        .end(function(err, res) {
          token = res.body.token;
          var userId = res.body.user._id;
          // post a trip
          chai.request(server)
            .post('/api/trips/')
            .set({token: token})
            .send({startDate: '2016-11-11', endDate: '2016-12-12', destination: 'Wonderland'})
            .end(function(err, res) {
              var tripId = res.body.obj._id;
              // delete a trip
              chai.request(server)
                .delete('/api/trips/'+ tripId)
                .set({token: token})
                .send()
                .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Deleted trip');
                  res.body.should.not.have.property('error');
                  done();
                });
            });
        });
    });
  });
});