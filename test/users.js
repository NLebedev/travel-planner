//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
var bcrypt = require('bcryptjs');
var mongoose = require("mongoose");
var User = require('../models/user');

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
  newUser = {
    firstName: 'Cat',
    lastName: 'Cheshire',
    email: 'cat@wonderland.com',
    password: '123456'
  };
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

describe('Users', function() {
  beforeEach(function(done) { //Before each test we empty the database
    setUsers();
    User.remove({}, function() {})
      .then(function(){return user.save(function(err,res){ userId = res._id});})
      .then(function(){return manager.save(function(err,res){managerId = res._id});})
      .then(function(){return admin.save(function(err,res){ adminId = res._id; done();});})   
  });
/*
  * Test the /GET route
  */
  describe('/api/users POST: SIGN UP USER', function() {
    it('should create a new user', function(done) {
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          // console.log(res);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.not.have.property('error');
          res.body.user.should.have.property('firstName').eql(newUser.firstName);
          done();
        });
    });
    
    it('should NOT create a user with empty last name', function(done) {
      newUser.lastName = '';      
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.not.have.property('token');
          res.body.should.not.have.property('user');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should NOT create a user with email in wrong format', function(done) {
      newUser.email = '123lf.ds.klk';
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.not.have.property('token');
          res.body.should.not.have.property('user');
          res.body.should.have.property('error');
          done();
        });
    });

    it('should NOT create a user with existing email', function(done) {
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          res.body.should.not.have.property('error');
          res.body.user.should.have.property('firstName').eql('Cat');
          
          chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end(function(err, res) {
              res.should.have.status(500);
              res.body.should.be.a('object');
              res.body.should.not.have.property('token');
              res.body.should.not.have.property('user');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    it('should create two users with different emails', function(done) {
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          newUser.email = 'alice@test.com';
          chai.request(server)
            .post('/api/users')
            .send(newUser)
            .end(function(err, res) {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('token');
              res.body.should.not.have.property('error');
              res.body.user.should.have.property('firstName').eql('Cat');
              done();
            });
        });
    });
  });

  describe('/api/users/singin POST: SIGN IN USER', function() {
    it('should NOT sign in user that is not registered', function(done) {
      newUser.email = 'alice@test.com';
      authenticateUser(newUser.email, newUser.password, function(err,res){
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.not.have.property('token');
        res.body.should.have.property('error');
        done();
      })
    });
    
    it('should sign in a registered user', function(done) {
      chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
          authenticateUser(newUser.email, newUser.password, function(err,res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            res.body.should.not.have.property('error');
            res.body.user.should.have.property('firstName').eql('Cat');
            done();
          });
        });
    });
  });

  describe('/api/users/ GET USERS', function() {
    it('should return all the users for admin', function(done) {
      authenticateUser(admin.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .get('/api/users/')
          .set({token: token})
          .send()
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Success');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });
    
    it('should return all the users for manager', function(done) {
      authenticateUser(manager.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .get('/api/users/')
          .set({token: token})
          .send()
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Success');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should NOT return all the users for user', function(done) {
      authenticateUser(user.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .get('/api/users/')
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

  describe('/api/users/:id PATCH USER', function() {
    it('should patch user as admin', function(done) {
      authenticateUser(admin.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + managerId)
          .set({token: token})
          .send({firstName: 'bunny'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated user');
            res.body.obj.should.have.property('firstName').eql('bunny');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should patch user as manager', function(done) {
      authenticateUser(manager.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + userId)
          .set({token: token})
          .send({firstName: 'bunny'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated user');
            res.body.obj.should.have.property('firstName').eql('bunny');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should patch role as admin', function(done) {
      authenticateUser(admin.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + userId)
          .set({token: token})
          .send({role: 'admin'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated user');
            res.body.obj.should.have.property('role').eql('admin');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should NOT patch role as manager', function(done) {
      authenticateUser(manager.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + userId)
          .set({token: token})
          .send({role: 'admin'})
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Updated user');
            res.body.obj.should.have.property('role').eql('user');
            res.body.should.not.have.property('error');
            done();
          });
      })
    });

    it('should NOT patch role as user', function(done) {
      authenticateUser(user.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + userId)
          .set({token: token})
          .send({role: 'admin'})
          .end(function(err, res) {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('Access denied');
            res.body.should.have.property('error');
            done();
          });
      })
    });
    
    it('should NOT patch user as user', function(done) {
      authenticateUser(user.email, '123456', function(err,res){
        // get users
        chai.request(server)
          .patch('/api/users/' + managerId)
          .set({token: token})
          .send({firstName: 'bunny'})
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
});
