const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = mongoose.model('Contact')

router.post('/', (req, res) => {
    insertRecord(req, res)
});



function insertRecord(req, res) {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.contact = req.body.contact;
    contact.city = req.body.city;
    contact.message = req.body.message;
    contact.save((err, doc) => {
        if (!err){
            res.redirect('/');
           console.log("doc", doc);
            }  else
                    console.log('Error during record insertion : ' + err);
            
        });
    }



/*function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'contact':
                body['contactError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}*/

module.exports = router;