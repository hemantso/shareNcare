const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Donation = mongoose.model('Donation')
require("../models/Donation.js")

router.post('/', async (req, res) => {
    console.log(req.body);
    if(!req.session.loggedIn){
        res.redirect('/login');
    } else{
       
        insertEvent(req, res);
    }
    
    
});
 
async function insertEvent(req, res) {
    console.log(req.body);
    req.body.username = req.session.user.username;
   
    var donation = new Donation();
  
     
    donation.username = req.body.username;
    donation.firstname = req.body.firstname;
    donation.lastname = req.body.lastname;
    donation.email = req.body.email;
    donation.donateto = req.body.donateto;
    donation.amount = req.body.amount;
    donation.paymentid = req.body.paymentid;
    
    donation.save((err, donation) => {
        if (!err)
            res.redirect('/');
        else {
            console.log('error during record isertion :' + err);
            res.status(500).send('Error connecting to database.');
        }
    });
};

module.exports = router;