/*
 |--------------------------------------
 | SuperVisor Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupervisorUserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
	district: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String,  required: true },
	eshkol_number: { type: String,  required: true },
    user_id: { type: String, required: true },
    creater_id : { type: String, required: true },
    userType: { type: String, required: true },
    country_id: { type: String, required: true }

});

module.exports = mongoose.model('CreateSupervisor', SupervisorUserSchema);
