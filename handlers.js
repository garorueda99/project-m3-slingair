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
  // seats availability
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
  flights[register.flight].find(
    (reg) => reg.id === register.seat
  ).isAvailable = false;
  res.status(301).redirect(`/confirmed/${key}`);
};

const handleConfirmation = (req, res) => {
  const { id } = req.params;
  const info = reservations.find((reg) => reg.id === id);
  res.status(301).render('pages/confirmed', { info });
};

const handleTicketCopyOfConfirmation = (req, res) => {
  let answer = reservations.find((reg) => reg.email === req.query.email);
  answer != undefined
    ? res.status(200).send(answer).end()
    : (answer = reservations.find(
        (reg) =>
          reg.surname === req.query.surname &&
          reg.givenName === req.query.givenName
      ));
  answer != undefined
    ? res.status(200).send(answer).end()
    : res.status(400).end();
};

module.exports = {
  handleFlight,
  handleFlightNumbers,
  handleSubmit,
  handleConfirmation,
  handleTicketCopyOfConfirmation,
};
