const User = require('./User.js');
const Event = require('./events.model.js');
const Join = require('./join.js');
const Donation = require('./Donation.js');
const mongoose = require('mongoose');
const Contact = require('./contact.model.js')

function connect(){
    return mongoose.connect('mongodb+srv://hemant:happy@cluster0-blez1.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
}
 module.exports ={
     models:{
         user: User,
         event: Event,
         join: Join,
         donation: Donation,
         contact: Contact
    },
    connect: connect
};