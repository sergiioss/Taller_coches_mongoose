const Workers = require('../models/workers');
const service = require('../services');

function signUp(req, res) {
    const user = new Workers({
        name_and_surname: req.body.name_and_surname,
        address: req.body.address,
        phone: req.body.phone,
        dni: req.body.dni,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
        hiring_date: req.body.hiring_date,
        acces_level: req.body.acces_level,
        password: req.body.password,
        extensions: req.body.extensions,
        image: req.body.image,
        contract: req.body.contract,
        job: req.body.job,
        current_account: req.body.current_account,
        future_use: req.body.future_use
    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error creating user:${err}` });

        return res.status(200).send({ token: service.createToken(user) })
    });
}

function signIn(req, res) {
    Workers.find({ dni: req.body.dni, password: req.body.password }, (err, workers) => {
        if (err) return res.status(500).send({ message: err });
        if (!workers) return res.status(404).send({ message: 'The user does not exist' })

        req.workers = workers;
        res.status(200).send({
            message: 'You have successfully logged in',
            token: service.createToken(workers)
        })
    })
}

function getWorkers(req, res) {
    Workers.find({}, (err, workers) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!workers) return res.status(404).send({ message: `There are no workers` })
        res.send(200, { workers })
    });
};

module.exports = {
    signUp,
    signIn,
    getWorkers
}