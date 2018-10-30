/*
 |--------------------------------------
 | Grower Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitesSchema = new Schema({
    grower_id: { type: String, required: true },
    supervisor_creator : { type: String, required: true },
    status: { type: String, required: true },
    open_date: { type: String, required: true },
    
});

module.exports = mongoose.model('Invites', invitesSchema);
