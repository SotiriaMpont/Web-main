const mongoose = require("mongoose");

const Poi = mongoose.model(
    'Positions',
    {
        id: { type: String },
        name: { type: String },
        address: { type: String },
        types: [{
            type: String
        }],
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        },
        rating: { type: Number },
        rating_n: { type: Number },
        populartimes: [{
            name: { type: String },
            data: [{
                type: Number
            }]
            //validate: [arrayLimit, '{PATH} exceeds the limit of 10']
        }],

    }, 'Positions');

module.exports = Poi;