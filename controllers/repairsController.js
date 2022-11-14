const repairs = require('../models/repairs');

function createRepair(req, res) {
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
        repair_number: req.body.repair_numer,
        fault_description: req.body.fault_description,
        insurance_company: req.body.insurance_company,
        future_use: req.body.future_use
    })

    try {
        repair.save((err) => {
            if (err) {
                res.status(500).send({ message: `Error creating repair:${err}` });
            } else {
                res.status(200).send({ message: 'The repair has been created' })
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
        });
    } catch (error) {
        res.send({ message: `Error getting repairs` })
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
    updateRepair
}