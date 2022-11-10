const express = require('express');
const api = express.Router();
const workCtrl = require('../controllers/workersController');
const auth = require('../middlewares/auth');

api.get('/', (req, res) =>{
    res.status(200).send('Bienvenido al Taller!!')
})

api.post('/signup', workCtrl.signUp);
api.post('/signin', workCtrl.signIn);
api.get('/workers', workCtrl.getWorkers);
api.delete('/deleteworker/:workerId', workCtrl.deleteWorkers);
api.put('/updateworker/:workerId', workCtrl.updateWorkers);



module.exports = api;