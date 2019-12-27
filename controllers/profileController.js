require("../models/events.model")
require("../models/join")
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const Join = mongoose.model('Join')
const upload = require('../controllers/multer');
require("../controllers/cloudinary.JS")
const cloudinary = require('cloudinary').v2


router.get('/', async (req, res) =>{
   
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

router.get('/:id', upload.single('myImage'),  (req, res) => {
    Event.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("events/addevents", {
                viewTitle: "Update Event",
                style: "addevent.css",
                event: doc
                
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/profile');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


module.exports = router;