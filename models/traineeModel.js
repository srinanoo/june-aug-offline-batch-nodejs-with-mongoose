const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const conn = require('../db');
conn.dbconnection();

const TraineeSchema = new Schema({
    name: {
        type: [String, "Please enter only String for Trainee Name!"],
        required: [true, "Please send the name of the Trainee!"],
        validate: {
            validator: function(email) {
                let emailV = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                return emailV.test(email);
            },
            messages: 'Please enter password in the correct format. 8-15 Characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
        }
    },
    age: {
        type: Number,
        required: [true, "Please send the age of the Trainee!"],
        min: [18, "Age should be greater than 18yrs!"],
        max: [50, "Age should be lesser than 50yrs!"]
    },
    active: {
        type: Boolean,
    },
    batch: {
        type: String,
        enum: ['January', 'March', 'July', 'October']
    }
});

const TraineeModel = mongoose.model('trainees', TraineeSchema);

const ClassesSchema = new Schema({
    name: {
        type: [String, "Please enter only String for Trainee Name!"],
        required: [true, "Please send the name of the Trainee!"],
        enum: ['Class 1', 'Class 1', 'Class 1', 'Class 1']
    },
    active: {
        type: Boolean,
    }
});
const ClassModel = mongoose.model('classes', ClassesSchema);

module.exports = { TraineeModel, ClassModel };