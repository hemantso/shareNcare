const express = require('express');
const app = express()
var exphbs  = require('express-handlebars');
const flash = require('connect-flash');
const bodyparser = require('body-parser');
const moment =require('moment');
var ObjectID = require('mongodb').ObjectID;
const session = require('express-session')
const routes = require('./controllers/home');
const db = require('./models/index.js');
var dbName ='Project9';

var PORT = process.env.PORT | 9090;


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	resave: true,
	cookie: { 
		httpOnly:true,
     	path: '/',
		sameSite: true,
		secure: false
	}
  }));

const controllers = require('./controllers/index.js');
const authRoute = require('./controllers/auth.js');
const eventController = require('./controllers/eventController.js');
const joinRoutes = require('./controllers/join.js');
const donationController = require('./controllers/donation.js');
const contactRoutes = require('./controllers/contactController.js');

const profileController = require('./controllers/profileController.js');

const hbs = exphbs.create({
	extname: '.hbs',
	helpers: {
		increment: function(value,options){
			return parseInt(value)+1;
		}
	}
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//apply auth middleware in application level
app.use(authRoute.checkIfLoggedIn);

console.log(eventController)

app.use('/', routes );
app.use('/join', joinRoutes);
app.use('/events', eventController);
app.post('/authentication', authRoute.login);
app.post('/register',  controllers.UserController.create);
app.use('/donations', donationController);
app.use('/info', contactRoutes);
app.use('/profile', profileController);

db.connect()
.then(function(){
	app.listen(PORT, function() {
		console.log("Application has started and running on port: ", PORT);
	}).on('error', function(error) {
		console.log("Unable to start app. Error >>>>", error);
	});
})
.catch(function(error){
	console.log("failed connection", error);
})
