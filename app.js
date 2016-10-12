var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();

mongoose.connect("mongodb://heroku_76s37f14:bolmad4npg6j0amfm70c9b35gg@ds021701.mlab.com:21701/heroku_76s37f14" || "mongodb://localhost:27017/bookworm");
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//use sessions for tracking login activity
app.use(session({
	secret: 'i am tracking you', 
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}));

//make userId available in templates
app.use(function(req, res, next){
	res.locals.currentUser = req.session.userId;
	next();
})

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen on port 3000
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Express app listening on port 3000');
});
