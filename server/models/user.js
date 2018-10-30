/*
 |--------------------------------------
 | User Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true },
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Phone_Number: { type: String, required: true },
    user_eskolnumber: { type: String, required: true },
    user_id: { type: String, required: true },
    creater_id: { type: String, required: true },
    country_id: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
