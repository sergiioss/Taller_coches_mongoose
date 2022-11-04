const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const Workers_accessSchema = new Schema({
    name_and_surname: String,
    job: String,
    acces_level: { type: String, enum: ['admin', '1', '2'] },
    email: { type: String, lowercase: true },
    password: { type: String, select: false },
    image: String,
    extensions: { type: Number, enum: [10, 20, 30] },
    future_use: String
})

Workers_accessSchema.pre('save', (next) => {
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

Workers_acessSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=2006&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('Workers_acess', Workers_accessSchema);