/* eslint-disable*/
const loaderBg = document.querySelector('.loader-bg');
const signupButton = document.querySelector('.signup-btn');
const form = document.querySelector('form');
const formFields = form.querySelectorAll('input');
const firstname = form.querySelector('.firstname');
const lastname = form.querySelector('.lastname');
const username = form.querySelector('.username');
const email = form.querySelector('.email');
const password = form.querySelector('.password');
const confirmPassword = form.querySelector('.confirmPassword');
const message = document.querySelector('.message');
const signupUrl = 'https://emmaadesile-ridemyway.herokuapp.com/auth/signup';

// validate email
const validateEmail = checkMail => {
  const testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return testEmail.test(checkMail);
};

// form data
let formData = {};

// Get the form data
function getFormData() {
  for (const data of formFields) {
    formData[data.name] = data.value.trim();
  }
  return formData;
}

function isEmpty(obj) {
  const keys = Object.keys(obj);
  return keys;
}

// Sign up validation
function validateSignup() {
  let isValid;
  const error = {};
  if (firstname.value === "") {
    error.firstname = "Firstname is required";
  }
  if (lastname.value === "") {
    error.lastname = "Lastname is required";
  }
  if (username.value === "") {
    error.username = "Username is required";
  }
  if (email.value === "") {
    error.email = "Email is required";
  }
  if (email.value && validateEmail(email.value) === false) {
    error.email = "Email address is invalid";
  }
  if (password.value === "") {
    error.password = "Password is required";
  }
  if (password.value.length > 2 && password.value.length < 6) {
    error.password = "Password must have at least 6 characters"
  }
  if (password.value.length > 15) {
    error.password = "Password cannot have more than 15 characters"
  }
  if (confirmPassword.value === "") {
    error.confirmPassword = "Please confirm your password"
  }
  if ((password.value && confirmPassword.value) && (password.value !== confirmPassword.value)) {
    error.confirmPassword = "Passwords do not match";
  }

  if (isEmpty(error).length === 0) {
    message.style.display = "none";
    isValid = true;
  } else {
    message.style.display = "block";
    message.innerHTML = "";
    for (const err of Object.entries(error)) {
      message.innerHTML += `
        ${err[1]} <br/>
     `;
    }
    isValid = false;
  }
  return isValid;
}

// handle signup
function signupHandler(e) {
  e.preventDefault();

  if (validateSignup() === false) return;
  
  loaderBg.style.display = 'grid';

  fetch(signupUrl, {
    method: 'POST',
    body: JSON.stringify(getFormData()),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json, text/plain, text/html;',
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
      console.log(data);
      message.style.display = 'block';

      // show message after signup
      function doHide() {
        message.style.display = 'none';
      }
      function hideMessage() {
        setTimeout(doHide, 2000);
      }

      // if success redirect to sign in page
      if (data.status === 'Success') {
        message.style.backgroundColor = '#40ac01';
        message.style.color = '#fff';
        message.innerHTML = data.message;
        // redirect to sign in page
        function redirect() {
          setTimeout(signinRedirect, 3000);
        }
        function signinRedirect() {
          window.location = './signin.html';
        }
        redirect();
      }
      if (data.status === 'Failed') {
        message.innerHTML = data.status;
      }
      hideMessage();
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = error.error;
    });
}

// add event listener to sign up button
signupButton.addEventListener('click', signupHandler);