const repairs = require('../models/repairs');
const workers = require('../models/workers');

function createRepair(req, res) {
    try {
        repairs.findOne({}).sort({ "repair_number": -1 }).exec(function (err, seq) {
            if (seq == null) {
                const repair = new repairs({
                    name_and_surname: req.body.name_and_surname,
                    phone: req.body.phone,
                    address: req.body.address,
                    clientDni: req.body.clientDni,
                    clientEmail: req.body.clientEmail,
                    price: req.body.price,
                    brand: req.body.brand,
                    model: req.body.model,
                    registration_year: req.body.registration_year,
                    image: req.body.image,
                    repair_number: 1,
                    fault_description: req.body.fault_description,
                    insurance_company: req.body.insurance_company,
                    future_use: req.body.future_use,
                    workerId: req.body.workerId
                })
                repair.save((err) => {
                    if (err) {
                        res.status(500).send({ message: `Error creating repair:${err}` });
                    } else {

                        let workersId = repair.workerId
                        let update = { reparations: [repair._id] }

                        workers.findByIdAndUpdate(workersId, update, (err, workerUpdated) => {

                            if (err) return res.status(500).send({ message: `Error updating the reparation: ${err}` })

                            return res.status(200).send({
                                workersUp: workerUpdated,
                                message: 'The repair has been created'
                            })
                        })
                    }
                })
            } else {
                seq.updateOne(seq.repair_number += 1)
                const repair = new repairs({
                    name_and_surname: req.body.name_and_surname,
                    phone: req.body.phone,
                    address: req.body.address,
                    clientDni: req.body.clientDni,
                    clientEmail: req.body.clientEmail,
                    price: req.body.price,
                    brand: req.body.brand,
                    model: req.body.model,
                    registration_year: req.body.registration_year,
                    image: req.body.image,
                    repair_number: seq.repair_number,
                    fault_description: req.body.fault_description,
                    insurance_company: req.body.insurance_company,
                    future_use: req.body.future_use,
                    workerId: req.body.workerId
                })
                repair.save((err) => {
                    if (err) {
                        res.status(500).send({ message: `Error creating repair:${err}` });
                    } else {
                        let workersId = repair.workerId
                        let update = { reparations: [repair._id] }

                        workers.findByIdAndUpdate(workersId, update, (err, workerUpdated) => {

                            if (err) return res.status(500).send({ message: `Error updating the reparation: ${err}` })

                            return res.status(200).send({
                                workersUp: workerUpdated,
                                message: 'The repair has been created'
                            })
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).send({ message: `Error creating repair:${error}` });
    }
}

function getRepairs(req, res) {
    try {
        repairs.find({}, (err, repairs) => {
            if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
            if (!repairs) {
                res.status(404).send({ message: `There are no workers` })
            } else {
                res.status(200).send({ repairs })
            }
        })
    } catch (error) {
        res.send({ message: `Error getting repairs` })
    }
};

function getRepairsExists(req, res) {
    try {
        repairs.find({ departure_date: { $ne: null } }, (err, repairs) => {
            if (!repairs) return res.status(404).send({ message: `There are no workers` })
            res.status(200).send({ repairs })
        });
    } catch (error) {
        res.status(500).send({ message: `Error making the request: ${err}` })
    }
};

function listRepairs(req, res) {
    try {
        repairs.find({}).sort({ entry_date: -1 }).exec(function (err, repairs) {
            if (err) return res.status(500).send({ message: `Error repairs` })
            if (!repairs) return res.status(404).send({ message: `There are no repairs` })
            res.status(200).send({ repairs })
        });
    } catch (error) {
        res.status(500).send({ message: `Error making the request: ${err}` })
    }
};

function deleteRepairs(req, res) {
    let repairsId = req.params.repairsId

    try {
        repairs.findById(repairsId, (err, repairs) => {
            if (!repairs) return res.send({ message: 'The repair does not exist' });
            repairs.remove(err => {
                if (err) res.status(500).send({ message: `Failed to delete repair: ${err}` });
                res.status(200).send({ message: 'The repair has been removed' });
            });
        });
    } catch (error) {
        res.status(500).send({ message: `${error}` })
    }
}

function updateRepair(req, res) {
    let repairsId = req.params.repairsId
    let update = req.body

    try {
        repairs.findByIdAndUpdate(repairsId, update, (err, repairsUpdate) => {
            if (err) res.status(500).send({ message: `Error updating the employee data: ${err}` })
            res.status(200).send({ repairs: repairsUpdate })
        })
    } catch (error) {
        res.status(500).send({ message: `Error updating the employee data: ${err}` })
    }
}

module.exports = {
    getRepairs,
    createRepair,
    deleteRepairs,
    updateRepair,
    getRepairsExists,
    listRepairs
}