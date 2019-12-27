const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://hemant:happy@cluster0-blez1.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}, (err) => {
    if (!err) {
        console.log('mongodb connection success :)')
    } else {
        console.log('error in db connection' + err)
    }
});

require('./join');
require('./events.model');
require('./Donation.js');
require('./contact.model');
