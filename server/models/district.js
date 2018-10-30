/*
 |--------------------------------------
 | District Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regionSchema = new Schema({
    region_name: { type: String, required: true },
});

module.exports = mongoose.model('Region', regionSchema);
