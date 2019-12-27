const User = require('./../models/User.js');
const AuthController = {};



AuthController.login = function(req, res){
    var username = req.body.username;
    var password = req.body.password;


    User.findOne({username: username, password: password}, function(err, user){

        if (err)
            throw err;
        if (user) {
            req.session.loggedIn = true;
            req.session.user = user.username;
        } else {
            req.session.loggedIn = false;
        }
        if (!req.session.loggedIn) {
            res.render('login.hbs', { 
                alert: "Invalid Credentials",
                title: 'shareNcare - Signup',
                style: 'login.css',
                 user: req.session.loggedIn
         });
        } else {
            req.session.user = user;
            req.session.loggedIn = true;
            req.session.loggedOut = false;


            res.redirect('/');

        }
    });
}





AuthController.checkIfLoggedIn = function(req, res, next){
    console.log("check session", req.session.user);
    console.log("url>>>>>", req.originalUrl);

    if(typeof(req.session.user) === "Undefined"){
      return res.redirect('/');
    } else{
        return next();
        }
    }

module.exports = AuthController;
