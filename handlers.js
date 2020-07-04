const { flights } = require('./test-data/flightSeating');
const { reservations } = require('./test-data/reservations');

const random = require('random-key-generator');

const handleFlightNumbers = (req, res) => {
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  res.status(200).send(allFlights);
};

const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // get all flight numbers
  const allFlights = Object.keys(flights);
  // is flightNumber in the array?
  res
    .status(200)
    .send(
      allFlights.includes(flightNumber)
        ? (seatArray = flights[flightNumber])
        : 'sorry flight not found'
    );
};

const handleSubmit = (req, res) => {
  const key = `${random(8)}-${random(4)}-${random(4)}-${random(4)}-${random(
    10
  )}`;
  key;
  const register = req.body;
  register.id = key;
  reservations.push(register);
  res.status(301).redirect(`/confirmed/${key}`);
};

module.exports = { handleFlight, handleFlightNumbers, handleSubmit };
