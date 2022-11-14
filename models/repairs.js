const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepairsSchema = new Schema({
    name_and_surname: String,
    phone: String,
    address: String,
    clientDni: { type: String, lowercase: false },
    clientEmail: { type: String, lowercase: true },
    entry_date: { type: Date, default: Date.now() },
    departure_date: Date,
    fault_description: String,
    repair_number: String,
    price: Number,
    brand: String,
    model: String,
    registration_year: Number,
    image: String,
    insurance_company: String,
    future_use: String
});

module.exports = mongoose.model('Repairs', RepairsSchema);