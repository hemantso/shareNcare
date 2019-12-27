require("../models/events.model")
require("../models/join")
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const Join = mongoose.model('Join')






router.get('/', async (req, res) => {
    try {
        docs = await Event.find({}).sort({
            'updatedAt': -1
        }).limit(4);
        res.render("home", {
            event: docs,
            title: 'shareNcare - Homepage',
            style: 'style.css',
            user: req.session.loggedIn
        });
    } catch (error) {
        console.log('Error in retrieving employee list :' + err);
    }


});

router.get('/create', (req, res) => {
    if(!req.session.loggedIn){
        res.redirect('/login');
    } else{
    res.render("events/addevents", {
        viewTittle: "Create an event",
        style: "addevent.css"

    });
}
});


router.get('/about', function (req, res) {
    res.render('about', {
        title: 'shareNcare - aboutus',
        style: 'about.css',
        user: req.session.loggedIn
    })
});

router.get('/contact', function (req, res) {
    res.render('contact', {
        title: 'shareNcare - Contact Us',
        style: 'contact.css',
        user: req.session.loggedIn
    });
});

router.get('/signup', function (req, res) {
    res.render('signup', {
        title: 'shareNcare - Signup',
        style: 'signup.css',
        user: req.session.loggedIn
    })
});



router.get('/login', function (req, res) {

    res.render('login', {
        title: 'shareNcare - Login',
        style: 'login.css',
        user: req.session.loggedIn
    })
});


router.get('/profile', async (req, res) =>{
   
    try {
        var userdata = req.session.user;
        joine = await Join.find({joinedBy: userdata.username});
        docs = await Event.find({username: userdata.username});
        console.log(userdata);
    
        res.render('profile', {
            title: 'Dashboard',
            style: 'profile.css',
            user: req.session.loggedIn,
            userdata: userdata,
            event: docs,
            join: joine
        })
        
    } catch (error) {
        console.log('Error in retrieving employee list :' + error);
    }
});



// Logout
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


router.get('/donation', function (req, res) {
    if (req.session.loggedIn) {
        res.render('donation', {
            title: 'shareNcare - Donation',
            style: 'donation.css',
            user: req.session.loggedIn
        })
    } else {
        res.render('login', {
            title: 'shareNcare - Login',
            style: 'login.css',
            user: req.session.loggedIn
        })
    }
});


module.exports = router;