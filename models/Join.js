const mongoose = require('mongoose');

const joinSchema = new mongoose.Schema({
    host:{
        type: String
        
    },
    eventtitle:{
        type: String
       
    },
    eventcity:{
        type: String
       
    },
    eventstate:{
        type: String
       
    },
    eventday:{
        type: String
       
    },
    eventmonth:{
        type: String
       
    },
    eventyear:{
        type: String
       
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

    
    joinedBy:{
        type: String
    }
});
console.log(joinSchema);
 mongoose.model('Join', joinSchema);
