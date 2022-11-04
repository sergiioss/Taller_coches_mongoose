const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');

api.get('/', (req, res) =>{
    res.status(200).send('Bienvenido al Taller!!')
})


module.exports = api;