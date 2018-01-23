require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
// var expressJWT = require('express-jwt'); //For protecting routes on backend
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  res.send('login stub');
});


// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  // TODO: FIRST CHECK IF USER ALREADY EXISTS
  console.log('/auth/signup post route', req.body);
  User.findOne({ email: req.body.email }, function(err, user){
    if(user){
      return res.status(400).send({error: true, message: 'User already exists'});
    }
    else {
      User.create(req.body, function(err, user){
        if(err){
          return res.status(503).send({
            error: true, 
            message: 'Database error: ' + err.message
          });
        }
        else {
          // MAKE TOKEN AND SEND IT TO CALLER
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
            expiresIn: 86400 // expires in 24 hours (expects seconds)
          });
          // RES.SEND CAN ONLY HAVE 1 ARGUMENT, THAT IS WHY USER AND TOKEN ARE WRAPPED AS OBJECT
          res.send({user: user, token: token});
        }
      });
    }
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  res.send('from token route stub');
});

module.exports = router;
