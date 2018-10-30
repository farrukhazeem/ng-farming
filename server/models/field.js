/*
 |--------------------------------------
 | Field Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fieldSchema = new Schema({
    field_name: { type: String, required: true },
    field_size: { type: String, required: true },
    seeding_date: { type: String, required: true },
    seeding_week: { type: Number, required: true },
    grower_id: { type: String, required: true },
    city: { type: String, required: true },
    eshkol_number: { type: Number, required: true }
    
});

module.exports = mongoose.model('Field', fieldSchema);
