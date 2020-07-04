'use strict';

// const bodyParser = require('body-parser')// not requiered any longer;
const express = require('express');
const morgan = require('morgan');
const {
  handleFlight,
  handleFlightNumbers,
  handleSubmit,
} = require('./handlers');

const PORT = process.env.PORT || 8000;

express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get('/flights', handleFlightNumbers)
  .get('/flights/:flightNumber', handleFlight)
  .post('/users', handleSubmit)
  .use((req, res) => res.send('Not Found'))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
