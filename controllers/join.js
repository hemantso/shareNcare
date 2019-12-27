const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Join = mongoose.model('Join')
require("../models/join.js")
const Event = mongoose.model('Event')
require("../models/events.model")



router.post('/join', async (req, res) => {
  
    insertEvent(req, res);
});
 
function insertEvent(req, res) {
    req.body._id = mongoose.Types.ObjectId(req.body.id);
    if (!req.session.loggedIn) {
        res.json({ warning: "Please login First!!!"});
        
    } else { 
    
    Event.find({_id:  req.body._id}, function(err, result){
        if (err){
             throw err;
       }else{
           res.json({ success: "Joined Successfully"});
           event(result,req.session.user.username);
        
    }
  
});

}
}

function event(data,username){

    var join = new Join();
   
    
    join.host =data[0].host;
    join.eventtitle = data[0].title;
    join.eventcity = data[0].city;
    join.eventstate = data[0].state;
    join.eventday = data[0].eventDateDay;
    join.eventmonth = data[0].eventDateMonth;
    join.eventyear = data[0].eventDateYear;
    join.joinedBy = username;
    
    join.save((err, result) => {
        if (!err)
            console.log(result);
        else {
            console.log('error during record isertion :' + err);
            res.status(500).send('Error connecting to database.');
        }
    });
};
    

module.exports = router;