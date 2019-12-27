const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String
        
    },
    email:{
        type: String
    },
    contact:{
        type: String
    },
    city:{
        type: String
    },
    message:{
        type: String
    }
});

contactSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


mongoose.model('Contact',contactSchema);