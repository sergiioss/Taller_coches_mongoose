const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkersSchema = new Schema({
    name_and_surname: String,
    address: String,
    phone: String,
    dni: String,
    email: { type: String, lowercase: true },
    age: Number,
    gender: { type: String, enum: ['male', 'female'] },
    hiring_date: { type: Date, default: Date.now() },
    contract: String,
    job: String,
    current_account: String,
    future_use:String
})

module.exports = mongoose.model('Workers', WorkersSchema);
