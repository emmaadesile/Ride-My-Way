// =============================================================
const userToken = sessionStorage.getItem('x-access-token');

// select all elements need from the page
const form = document.querySelector('form');
const userLocation = form.querySelector('.location');
const destination = form.querySelector('.destination');
const departuretime = form.querySelector('.departuretime');
const datecreated = form.querySelector('.datecreated');
const seatsAvailable = form.querySelector('.seatsavailable');
const formFields = form.querySelectorAll('input');
const createRideButton = document.querySelector('.btn-ride');
const message = document.querySelector('.message');
const loaderBg = document.querySelector('.loader-bg');
const formData = {};
const ridesUrl = 'https://emmaadesile-ridemyway.herokuapp.com/users/rides';

// function to get form data
function getFormData() {
  // for (const field of formFields) {
  //   formData[field.name] = field.value.trim();
  // }
  // formFields.forEach((field) => {
  // });
  let date = new Date(datecreated.value);
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
  formData.location = userLocation.value;
  formData.destination = destination.value;
  formData.departuretime = departuretime.value;
  formData.datecreated = date;
  formData.seatsavailable = seatsAvailable.value;
  return formData;
}

// check if the error object is empty
function isEmpty(obj) {
  const keys = Object.keys(obj);
  return keys;
}

// check time format
function timeFormat(time) {
  const pattern = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/;
  return pattern.test(time)
}

// check the date format
function dateFormat(date) {
  const pattern = /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/;
  return pattern.test(date);
}

// check if the seats value provied is a number
function checkValidNumber(val) {
  const numCheck = /^\d+$/;
  return numCheck.test(val);
}

// form validation
function validateForm() {
  let isValid;
  const error = {};

  if (userLocation.value === '') {
    error.userLocation = 'Please enter your location';
  }
  if (destination.value === '') {
    error.destination = 'Please enter your destination';
  }
  if (departuretime.value === '') {
    error.time = 'Please enter the time of departure';
  }
  if (timeFormat(departuretime.value) === '') {
    error.time = 'Time format is invalid';
  }
  if (datecreated.value === '') {
    error.date = 'Ride date is required';
  }
  if (dateFormat(datecreated.value) === false) {
    error.date = 'Date format is invalid';
  }
  if (seatsAvailable.value === '') {
    error.seats = 'Please enter the seats available';
  }
  if (seatsAvailable.value && checkValidNumber(seatsAvailable.value) === false) {
    error.seats = 'Seats must be a number';
  }

  if (isEmpty(error).length === 0) {
    message.style.display = 'none';
    isValid = true;
  } else {
    message.style.display = 'block';
    message.innerHTML = '';
    for (const err of Object.entries(error)) {
      message.innerHTML += `
        ${err[1]} <br/>
     `;
    }
    isValid = false;
  }
  return isValid;
}

// request data for creating a new ride
const newRideRequest = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  body: JSON.stringify(getFormData()),
  headers: new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'x-access-token': userToken,
  }),
  redirect: 'follow',
  referrer: 'no-referrer'
};

// this is the loading animation function
function loadAnimation() {
  loaderBg.style.display = 'grid';
}

// this removes the loading animation
function stopLoading() {
  loaderBg.style.display = 'none';
}

// create ride function
function createRide(e) {
  e.preventDefault();

  if (validateForm() === false) return;

  const loading = setTimeout(() => {
    loadAnimation();
  }, 100);

  fetch(ridesUrl, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(getFormData()),
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': userToken,
    }),
    redirect: 'follow',
    referrer: 'no-referrer'
  })
    .then((resp) => {
      // clear the formfield
      form.reset();
      // loading animation
      loaderBg.style.display = 'none';
      return resp.json();
    })
    .then((data) => {
      // this message shows if the request was successful
      function showSuccessMessage() {
        message.style.display = 'block';
        message.style.backgroundColor = '#40ac01';
        message.style.color = '#fff';
        message.textContent = data.message;
      }
      function showErrorsMessage() {
        message.style.display = 'block';
        message.style.backgroundColor = '#F2DEDE;';
        message.style.color = '#C86F6E';
        message.textContent = data.message;
      }
      // this removes the message from the dom after 4s
      function removeMessage() {
        setTimeout(() => {
          message.style.display = 'none';
        }, 4000);
      }
      if (data.status === 'Success') {
        console.log(data);
        showSuccessMessage();
        removeMessage();
      } else {
        showErrorsMessage();
        removeMessage();
      }
    })
    .catch((error) => { 
      if (error) return stopLoading();
      console.log({ error });
    });
}

createRideButton.addEventListener('click', createRide);