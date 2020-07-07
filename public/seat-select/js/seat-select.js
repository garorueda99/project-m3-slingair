const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const form = document.querySelector('#seats');

let selection = '';

const renderSeats = (data) => {
  //clean the canvas
  const seatsContainer = document.querySelector('#seats-section');
  seatsContainer.innerHTML = '';
  //Start populating
  document.querySelector('.form-container').style.display = 'block';
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement('ol');
    row.classList.add('row');
    row.classList.add('fuselage');
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement('li');

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      seat.innerHTML = seatAvailable;
      data.find((seat) => seat.id === seatNumber).isAvailable
        ? (seat.innerHTML = seatAvailable)
        : (seat.innerHTML = seatOccupied);
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms['seats'].elements['seat'];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove('selected');
        }
      });
      document.getElementById(seat.value).classList.add('selected');
      document.getElementById('seat-number').innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  // console.log('toggleFormContent: ', flightNumber);
  fetch(`/flights/${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      renderSeats(data);
    });
};

const handleConfirmSeat = (event) => {
  event.preventDefault();
  const list = document.getElementById('flight');
  const flightNumber = list.options[list.selectedIndex].text;

  try {
    const seat = document.querySelector('.selected').innerText;
    fetch('/users', {
      method: 'POST',
      redirect: 'follow',
      body: JSON.stringify({
        id: null,
        flight: flightNumber,
        seat: seat,
        givenName: document.getElementById('givenName').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.redirected) {
          console.log('checkpoint');
          window.location.href = res.url;
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    window.alert('Please, select a seat');
    console.log('check this ', err);
    return;
  }
};

function loadFlights() {
  fetch('/flights')
    .then((data) => data.json())
    .then((flights) => {
      flights.forEach((flight) => {
        const line = document.createElement('option');
        line.value = flight;
        line.innerText = flight;
        flightInput.appendChild(line);
      });
    });
}

loadFlights();
flightInput.addEventListener('change', toggleFormContent);
form.addEventListener('onsubmit', handleConfirmSeat);
