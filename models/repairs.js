const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RepairsSchema = new Schema({
    name_and_surname: String,
    phone: String,
    address: String,
    email: {type: String, unique: true, lowercase: true},
    entry_date: Date,
    departure_date: {type: Date, default: Date.now()},
    price: Number,
    brand: String,
    model: String,
    registration_year: Number,
    image: String,
    insurance_company: String,
    future_use:String
});

module.exports = mongoose.model('Repairs', RepairsSchema);