const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    org:{
        type: String 
    }, 
    orgname:{
        type: String
    },
    username:{
        type: String,
        required: true,
        unique: true
        
    },
    firstname: {
        type: String
        
    },
    lastname: {
        type: String
        
    },
    mobile: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
        
    },
    email: {
        type: String,
    },
    birth: {
        type: Date
        
    },
    gender: {
        type: String
        
    },

    password: {
    type: String,
    required: true
   },

  confirmpassword: {
    type: String,
   
},
createdAt:{
    type:Date,
    default:(new Date())
}
},
{
    collection: 'users'

});
const User = mongoose.model('User', userSchema);

module.exports = User;
