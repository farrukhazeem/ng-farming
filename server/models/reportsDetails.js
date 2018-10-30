/*
 |--------------------------------------
 | ReportsDetails Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsDetailsSchema = new Schema({

    report_id: { type: String, required: true },
    grower_id: { type: String, required: true },
    field_id: { type: String, required: true },
    infection_level: { type: String, required: true },
    bug_id: { type: String, required: true },
    product_stabilization: { type: String, required: false },
    recommendations: { type: String, required: true },
    notes: { type: String, required: false },
    
});

module.exports = mongoose.model('ReportsDetails', reportsDetailsSchema);
