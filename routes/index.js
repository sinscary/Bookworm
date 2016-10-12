var express = require('express');
var router = express.Router();
var User = require('../models/users');

//GET/Register
router.get('/register', function(req, res, next){
	return res.render('register', {title: 'Sign Up'});
});

//POST/Register
router.post('/register', function(req, res, next){
	if(req.body.email &&
	   req.body.name &&
	   req.body.favoriteBook &&
	   req.body.password &&
	   req.body.confirmPassword){


	   //Check if passwords match
	   if(req.body.password !== req.body.confirmPassword){
	   	var err = new Error('Password do not match');
	   	err.status=400;
	   	return next(err);
	   }
	   // create objects with form input data
	   var userData = {
	   		email: req.body.email,
	   		name: req.body.name,
	   		favoriteBook: req.body.favoriteBook,
	   		password: req.body.password
	   };

	   User.create(userData, function(error, user){
	   	if(error){
	   		return next(error);
	   	}
	   	else{
	   		return res.redirect('/profile');
	   	}
	   })
	} 
	else{ //Error if any field is left empty
		var err = new Error('All fields are required');
		err.status = 400;
		return next(err);
	}
});

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
