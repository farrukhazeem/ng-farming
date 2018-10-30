/*
 |--------------------------------------
 | Grower Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const growerSchema = new Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    cell_phone: { type: String, required: true },
    email: { type: String, required: true },
    zip_code: { type: String, required: true },
    office_phone: { type: String, required: true },
    farm_name: { type: String, required: true },
    address: { type: String, required: true },
    eshkol_number: { type: String, required: true },
    region_id: { type: String, required: true },
    supervisor_id: { type: String, required: true}
});

module.exports = mongoose.model('Grower', growerSchema);
