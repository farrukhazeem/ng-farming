/*
 |--------------------------------------
 | Grower Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitesDetailsSchema = new Schema({
    invite_id: { type: String, required: true },
    grower_id: { type: String, required: true },
    product_id: { type: String, required: true },
    field_id: { type: String, required: true },
    requested_quantity: { type: String, required: true },
    approved_quantity: { type: String, required: true },
    supply_date: { type: String, required: true },
    status: { type: String, required: true },
    size: { type: String, required: true }

});

module.exports = mongoose.model('InvitesDetails', invitesDetailsSchema);
