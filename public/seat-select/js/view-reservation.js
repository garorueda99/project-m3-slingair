const givenName = document.querySelector('#givenName');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');

const handleCheckSeat = (event) => {
  event.preventDefault();
  const route = validateFields();
  switch (route) {
    case 'email':
      getDataWithEmail();
      break;
    case 'fullName':
      getDataWithFullName();
      break;
  }
  // fetch("/reservation?email=")
};

function validateFields() {
  if (givenName.value === '' && surname.value === '' && email.value === '') {
    alert('Please, complete the required fields');
  } else if (email.value != '') {
    return 'email';
  } else if (givenName.value === '' || surname.value === '') {
    alert('Please, complete the required fields');
  } else {
    return 'fullName';
  }
}

function getDataWithEmail() {
  fetch(`/ticketinfo?email=${email.value}`)
    .then((data) => data.json())
    .then((ticket) => updatePageWithTicket(ticket))
    .catch((err) => alert('Please, check your info'));
}

function getDataWithFullName() {
  fetch(`/ticketinfo?surname=${surname.value}&givenName=${givenName.value}`)
    .then((data) => data.json())
    .then((ticket) => updatePageWithTicket(ticket))
    .catch((err) => alert('Please, check your info'));
}

function updatePageWithTicket(ticket) {
  const flight = document.querySelector('#flight');
  const seat = document.querySelector('#seat');
  const name = document.querySelector('#name');
  const email = document.querySelector('#email-2');
  flight.innerText = ticket.flight;
  seat.innerText = ticket.seat;
  name.innerText = ` ${ticket.givenName} ${ticket.surname}`;
  email.innerText = ticket.email;
}
