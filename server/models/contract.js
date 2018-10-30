/*
 |--------------------------------------
 | Bug Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractSchema = new Schema({

    grower_id: { type: String, required: true },
    product_id: { type: String, required: true },
    amount: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    
});

module.exports = mongoose.model('Contract', contractSchema);
