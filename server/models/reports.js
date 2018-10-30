/*
 |--------------------------------------
 | Product Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsSchema = new Schema({
    report_opener_id: { type: String, required: true },
    grower_id: { type: String, required: true },
    creation_date: { type: String, required: true }
});

module.exports = mongoose.model('Reports', reportsSchema);
