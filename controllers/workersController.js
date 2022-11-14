const workers = require('../models/workers');
const service = require('../services');

function signUp(req, res) {
    const user = new workers({
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

    try {
        user.save((err) => {
            if (err) {
                res.status(500).send({ message: `Error creating user` })
            } else {
                res.status(200).send({
                    message: `The Worker has been created`,
                    token: service.createToken(user)
                })
            }
        })
    } catch (err) {
        res.status(500).send({ message: `There has been an error creating the new worker` })
    }
}

function signIn(req, res) {

    try {
        workers.find({ dni: req.body.dni, password: req.body.password }, (err, workers) => {
            if (err) return res.status(500).send({ message: err });
            if (!workers) return res.status(404).send({ message: 'The user does not exist' })
            req.workers = workers;
            res.status(200).send({
                message: 'You have successfully logged in',
                token: service.createToken(workers)
            })
        })
    } catch (error) {
        res.status(500).send({ message: `Error ${err}` })
    }
}

function getWorkers(req, res) {
    try {
        workers.find({}, (err, workers) => {
            if (!workers) return res.status(404).send({ message: `There are no workers` })
            res.status(200).send({ workers })
        });
    } catch (error) {
        res.status(500).send({ message: `Error making the request: ${err}` })
    }
};

function updateWorkers(req, res) {
    let workersId = req.params.workerId
    let update = req.body
    
    try {
        workers.findByIdAndUpdate(workersId, update, (err, workersUpdated) => {
            res.status(200).send({ workers: workersUpdated })
        })
    } catch (error) {
        res.status(500).send({ message: `Error updating the employee data: ${err}` })
    }
}

function deleteWorkers(req, res) {
    let workerId = req.params.workerId

    try {
        workers.findById(workerId, (err, worker) => {
            if (!worker) return res.send({ message: 'The worker does not exist' });
            worker.remove(err => {
                if (err) res.status(500).send({ message: `Failed to delete worker: ${err}` });
                res.status(200).send({ message: 'The worker has been removed' });
            });
        });
    } catch (err) {
        res.status(500).send({ message: `Failed to delete worker: ${err}` })
    }
}


module.exports = {
    signUp,
    signIn,
    getWorkers,
    deleteWorkers,
    updateWorkers,
}
