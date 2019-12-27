const mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
    title: {
        type: String,
    },

    city: {
        type: String
    },
    state: {
        type: String
    },
    host: {
        type: String
    },

    description: {
        type: String,


    },

    requirements: {
        type: String
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },

    eventDateDay: {
        type: String

    },
    eventDateMonth: {
        type: String

    },
    eventDateYear: {
        type: String

    },
    image: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    }

});

mongoose.model('Event', eventSchema);