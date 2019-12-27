const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Event = mongoose.model('Event')
const upload = require('../controllers/multer');
require("../models/events.model")
require("../controllers/cloudinary.JS")
const cloudinary = require('cloudinary').v2

router.post('/', upload.single('myImage'), async (req, res) => {

    if (!req.session.loggedIn) {
        req.redirect('/login');
    } else {

        if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
    }


});

 async function updateRecord(req, res) {

    // try {
    //     result = await cloudinary.uploader.upload(req.file.path)
    // } catch (error) {
    //     res.status(500).send(error.message);
    //     return;
    // }
   
    Event.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    }, (err, doc) => {
        if (!err) {
            res.redirect('/events');
        } else {
            console.log('Error during record update : ' + err);
        }
    });
}

async function insertRecord(req, res) {
    req.body.username = req.session.user.username;
    req.body.mobile = req.session.user.mobile;
    req.body.email = req.session.user.email;
    let result;
    try {
        result = await cloudinary.uploader.upload(req.file.path)
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }

    var event = new Event();
    var date = new Date(req.body.eventDate);

    event.title = req.body.title;
    event.state = req.body.state;
    event.city = req.body.city.toLowerCase();
    event.description = req.body.description;
    event.requirements = req.body.requirements;
    event.eventDateDay = date.getDate();
    event.eventDateMonth = date.getMonth() + 1;
    event.eventDateYear = date.getFullYear();
    event.image = result.url;
    event.updatedAt = Date.now();
    event.username = req.body.username;
    event.mobile = req.body.mobile;
    event.email = req.body.email;
    event.host = req.body.host;
    event.save((err, event) => {
        if (!err)
            res.redirect('/events');
        else {
            console.log('error during record isertion :' + err);
            res.status(500).send('Error connecting to database.');
        }
    });
};


router.get('/', async (req, res) => {
    if (!req.query.city){
        try {
            const pagination = req.query.pagination ?
                parseInt(req.query.pagination) : 5;
    
            const page = req.query.page ? parseInt(req.query.page) : 1;
            
           docs = await Event.find({}).sort({
                    'updatedAt': -1
                })
                .skip((page - 1) * pagination)
                .limit(pagination);
    
    
            res.render("event", {
                event: docs,
                title: 'shareNcare - Events',
                style: 'event.css',
                pagenext: page + 1,
                pageprevious: page - 1,
                user: req.session.loggedIn
            });
        } catch (error) {
            console.log('Error in retrieving employee list :' + error);
        }
    
    

    } else {
    try {
        const pagination = req.query.pagination ?
            parseInt(req.query.pagination) : 5;

        const page = req.query.page ? parseInt(req.query.page) : 1;
        
        var data = req.query.city.toLowerCase();
       console.log('data', data);
    

        docs = await Event.find({city: data}).sort({
                'updatedAt': -1
            })
            .skip((page - 1) * pagination)
            .limit(pagination);


        res.render("event", {
            event: docs,
            title: 'shareNcare - Events',
            style: 'event.css',
            pagenext: page + 1,
            pageprevious: page - 1,
            user: req.session.loggedIn
        });
    } catch (error) {
        console.log('Error in retrieving employee list :' + error);
    }
}

});



// router.get('/search', async (req, res) => {
//     try{
//     var data = req.query.city;
//     console.log("data1", data);
//     dum = await Event.find({city: data});
      
//            res.render("event", {
//                title: 'Search',
//                style: 'event.css',
//                event: dum,
//                user: req.session.loggedIn
               
//             })
            
//         } catch (error) {
//             console.log('Error in retrieving employee list :' + error);
//         }
//     });

/*router.get('/result', async (req, res) => {
     var data = req.query.city;
     console.log("data1", data);
     Event.find({city: data},function(err, result) {
        if (err) throw err;
        if (result) {
            res.render("event", {
                event: result,
                title: 'shareNcare - Events',
                style: 'event.css',
                
            });
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        
        }
    })
}) ;      */
         


        



module.exports = router;