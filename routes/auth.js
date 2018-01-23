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
  User.findOne({email: req.body.email}, function(err, user){
    if(!user || !user.password){
      return res.status(404).send({error: true, message: 'User Not Found!'});
    }
    if(bcrypt.compareSync(req.body.password, user.password)){
      // GOOD PASSWORD
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours (expects seconds)
      });
      res.send({user: user, token: token});
    }
    else {
      // BAD PASSWORD
      res.status(401).send({error: true, message: 'Bad password'});
    }
  });
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
  // CAN DO QUERIES THROUGH TOKEN STRING
  var token = req.body.token || req.query.token;
  if(!token){
    return res.status(418).send({error: true, message: 'You must be a teapot.'});
  }

  // GET THE USER FROM THE TOKEN
  jwt.verify(token, process.env.JWT_SECRET, function(err, user){
    if(err){
      return res.status(500).send({error: true, message: 'JWT Verification Error - ' + err})
    }
    //FIND USER BY USING ID FROM JWT
    User.findById({
      '_id': user._id
    }, function(err, user){
      if(err){
        return res.status(500).send({error: true, message: 'Database Error - ' + err.message});
      }
      else if (!user){
        return res.status(404).send({error: true, message: 'User unable to be found from token'});
      }

      //RENEW TOKEN
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: 86400
      });
      res.send({user: user, token: token});


    })
  })
});

module.exports = router;
