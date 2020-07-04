const { flights } = require('./test-data/flightSeating');

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

module.exports = { handleFlight, handleFlightNumbers };
