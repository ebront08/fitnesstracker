const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Fit = new Schema({
    day: { type: Date, default: Date.now },

    exercises: [
        {
            type: { 
                type: String, 
                required: true 
            },
            name: { 
                type: String, 
                required: true 
            },
            duration: { 
                type: Number, 
                required: true 
            },
            
            sets: Number,
            reps: Number,
            weight: Number,
            distance: Number
        }
    ]
});

//represents the structure of the document
const workout = mongoose.model("Workout", Fit);
module.exports = workout;