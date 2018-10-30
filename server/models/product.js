/*
 |--------------------------------------
 | Product Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: { type: String, required: true },
    product_sku: { type: String, required: true },
    product_quantity_bottle: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);
