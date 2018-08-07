const userToken = sessionStorage.getItem('x-access-token');
const rides = document.querySelector('.rides');
const ridesHeading = document.querySelector('.ride-heading');
let viewRideButtons;
let closeButton;
let cancelButton;
let joinRideButton;
const modal = document.getElementById('modal');
let modalBody;
let modalFooter;
const loading = document.querySelector('.loader-bg');
// Get the <span> element that closes the modal
const ridesUrl = 'https://emmaadesile-ridemyway.herokuapp.com/rides';



// These event executed after the rides have been loaded to the page
// they are triggered when the user clicks to view the details of a ride
function rideEventListeners() {
  // View the details of a ride
  viewRideButtons.forEach(button => button.addEventListener('click', viewRideDetails));
}

// close modal
function closeModal() {
  modal.style.display = 'none';
}

// request details for getting all rides
const requestDetails = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: new Headers({
    'x-access-token': userToken,
  }),
  redirect: 'follow',
  referrer: 'no-referrer'
};

// Function to fetch all rides
function getAllRides() {
  const request = new Request(ridesUrl, requestDetails);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        if (data.rides.length === 0) {
          console.log(data.rides);
          ridesHeading.innerHTML = `
          <h5>
            There are no rides avalidable
          <h5>
          `;
        }
        data.rides.map((ride) => {
          ridesHeading.innerHTML = 'Available rides';
          rides.innerHTML += `
          <div class='ride'>
            <span class='ride-id'>${ride.ride_id}</span>
            <h5 class='ride-name'>${ride.location} to ${ride.destination}</h5>
            <button class='btn btn__secondary btn-modal btn-view-rides'>View</button>
          </div>
          `;
          viewRideButtons = document.querySelectorAll('.btn-modal');
          rideEventListeners();
        });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}

// call the get all rides function
getAllRides();

// request for getting a single ride
const singleRideRequest = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: new Headers({
    'x-access-token': userToken
  }),
  redirect: 'follow',
  referrer: 'no-referrer'
};

// View the details of a ride
function viewRideDetails(e) {
  const lastElement = e.target.previousElementSibling;
  const rideId = lastElement.previousElementSibling.innerText;
  const rideUrl = `https://emmaadesile-ridemyway.herokuapp.com/rides/${rideId}`;
  const request = new Request(rideUrl, singleRideRequest);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        console.log(data);
        modal.style.display = 'block';
        modal.innerHTML = `
        <div class='modal-content'>
          <div class='modal-header'>
            <span class='close'>&times;</span>
            <h4>Ride Details</h4>
          </div>
          <div class='modal-body'>
            <span class='ride-id'>${data.ride[0].ride_id}</span>
            <h6>Location: ${data.ride[0].location}</h6>
            <h6>Destination: ${data.ride[0].destination}</h6>
            <h6>Departure Time: ${data.ride[0].departuretime}</h6>
            <h6>Date Created: ${data.ride[0].datecreated.slice(0, 10)}</h6>
            <h6>Seats Available: ${data.ride[0].seatsavailable}</h6>
          </div>
          <div class='modal-footer'>
            <button class='btn btn__grey btn-cancel'>Cancel</button>
            <button class='btn btn__secondary btn-join-ride'>Join</button>
          </div>
        </div>
      `;
        modalBody = document.querySelector('.modal-body');
        modalFooter = document.querySelector('.modal-footer');
        closeButton = document.querySelector('.close');
        cancelButton = document.querySelector('.btn-cancel');
        joinRideButton = document.querySelector('.btn-join-ride');
        // When the user clicks on <span> (x)
        // or the cancel button close the modal
        closeButton.addEventListener('click', closeModal);
        cancelButton.addEventListener('click', closeModal);
        joinRideButton.addEventListener('click', joinRide);
      }
    })
    .catch(error => console.log(error));
}

// request to join a ride details
const joinRideRequest = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'x-access-token': userToken,
  }),
  redirect: 'follow',
  referrer: 'no-referrer'
};

// User can make request to join ride
function joinRide(e) {

  // hide the footer of the modal after the user requests to join
  modalFooter.style.display = "none";
  // add the loading animation while the request is processed
  modalBody.innerHTML +=`
    <div>
      <div class='loader'></div>
    </div>
  `;
  const parentElement = e.target.parentNode;

  const rideId = parentElement.previousElementSibling.firstElementChild.innerText;
  const joinRideUrl = `https://emmaadesile-ridemyway.herokuapp.com/rides/${rideId}/requests`;
  const request = new Request(joinRideUrl, joinRideRequest);
  console.log(rideId);
  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === "Success") {
        console.log(data);
        modalBody.innerHTML = `
          <h6>${data.message}</h6>
        `;
        closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', closeModal);
      }
      else {
        console.log(data);
        modalBody.style.backgroundColor =  "#F2DEDE";
        modalBody.innerHTML = `
          <h6>${data.error}</h6>
        `;
      }
    })
    .catch(error => console.log(error));
}

// When the user clicks anywhere outside of the modal, close the modal
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
