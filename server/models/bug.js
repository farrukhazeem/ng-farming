/*
 |--------------------------------------
 | Bug Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
    bug_name: { type: String, required: true },
});

module.exports = mongoose.model('Bug', bugSchema);
