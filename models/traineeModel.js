const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const conn = require('../db');
conn.dbconnection();

const TraineeSchema = new Schema({
    name: {
        type: [String, "Please enter only String for Trainee Name!"],
        required: [true, "Please send the name of the Trainee!"]
    },
    age: {
        type: Number,
        required: [true, "Please send the age of the Trainee!"],
        min: [18, "Age should be greater than 18yrs!"],
        max: [50, "Age should be lesser than 50yrs!"]
    },
    active: {
        type: Boolean,
    }
});

const TraineeModel = mongoose.model('trainees', TraineeSchema);

module.exports = TraineeModel;