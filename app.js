'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes/index');
const cors = require('cors');

var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.set('view engine', '.hbs');
app.use('/api', api)

module.exports = app;


