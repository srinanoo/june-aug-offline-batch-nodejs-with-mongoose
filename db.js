const mongoose = require('mongoose');
require('dotenv').config();

async function dbconnection() {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB Successfully!!");
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = { dbconnection };