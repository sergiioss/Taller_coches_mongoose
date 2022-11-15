const express = require('express');
const api = express.Router();
const workCtrl = require('../controllers/workersController');
const repairCtrl = require('../controllers/repairsController');
const auth = require('../middlewares/auth');

api.get('/', (req, res) =>{
    res.status(200).send('Bienvenido al Taller!!')
})

/* Routes workers */
api.post('/signup', workCtrl.signUp);
api.post('/signin', workCtrl.signIn);
api.get('/workers', workCtrl.getWorkers);
api.get('/workers/age', workCtrl.getWorkersAge);
api.delete('/deleteworker/:workerId', workCtrl.deleteWorkers);
api.put('/updateworker/:workerId', workCtrl.updateWorkers);

/* Routes repairs */
api.get('/repairs', repairCtrl.getRepairs);
api.post('/create/repairs', repairCtrl.createRepair);
api.delete('/delete/repairs/:repairsId', repairCtrl.deleteRepairs);
api.put('/update/repair/:repairsId', repairCtrl.updateRepair);
api.get('/repairs/exist', repairCtrl.getRepairsExists);



module.exports = api;