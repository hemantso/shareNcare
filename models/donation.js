const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    
    firstname: {
        type: String
        
    },
    lastname: {
        type: String
        
    },
    
    email: {
        type: String,
    },
    donateto: {
        type: String,
    },
 
createdAt:{
    type:Date,
    default:(new Date())
},
amount: {
    type: String,
}
},
{
    collection: 'donation'

});
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
