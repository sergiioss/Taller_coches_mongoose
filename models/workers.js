const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const WorkersSchema = new Schema({
    name_and_surname: String,
    address: String,
    phone: String,
    dni: { type: String, unique: true, lowercase: false },
    email: { type: String, unique: true, lowercase: true },
    age: Number,
    gender: { type: String, enum: ['male', 'female'] },
    hiring_date: { type: Date, default: Date.now() },
    acces_level: { type: String, enum: ['admin', '1', '2'] },
    password: { type: String, select: false },
    extensions: { type: Number, enum: [10, 20, 30] },
    image: Buffer,
    contract: String,
    job: String,
    current_account: String,
    future_use: String
})

WorkersSchema.pre('save', (next) => {
    let user = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return (err)

            user.password = hash
            next()
        });
    });
});

WorkersSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('Workers', WorkersSchema);
