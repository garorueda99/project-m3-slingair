const givenName = document.querySelector('#givenName');
const surname = document.querySelector('#surname');
const email = document.querySelector('#email');
const screenConfirmation = document.querySelector('#screenConfirmation');

const handleCheckSeat = (event) => {
  screenConfirmation.innerHTML =
    '<p class="message" id="message">Fill the blanks!</p>';
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
    .then((tickets) => updatePageWithTicket(tickets))
    .catch((err) =>
      alert(' Please, check your info, it seems there is someting wrong')
    );
}

function getDataWithFullName() {
  fetch(`/ticketinfo?surname=${surname.value}&givenName=${givenName.value}`)
    .then((data) => data.json())
    .then((tickets) => updatePageWithTicket(tickets))
    .catch((err) =>
      alert(' Please, check your info, it seems there is someting wrong')
    );
}

function updatePageWithTicket(tickets) {
  const message = document.querySelector('#message');
  message.innerText = 'Found Ticket(s)';
  tickets.forEach((reg) => {
    const print = `
  <ul class="user-info register">
      <li>Flight #:<span>${reg.flight}</span> seat #: <span>${reg.seat}</span></li>
      <li>Name:<span>${reg.givenName} ${reg.surname}</span></li>
      <li>Email:<span>${reg.email}</span></li>
  </ul>
  <br>`;
    screenConfirmation.innerHTML = screenConfirmation.innerHTML + print;
  });
}
