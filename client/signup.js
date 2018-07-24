/* eslint-disable*/
const loaderBg = document.querySelector('.loader-bg');
const signupButton = document.querySelector('.signup-btn');
const message = document.querySelector('.message');
const form = document.querySelector('form');
const formFields = form.querySelectorAll('input');
const firstname = form.querySelector('.firstname');
const lastname = form.querySelector('.lastname');
const username = form.querySelector('.username');
const email = form.querySelector('.email');
const password = form.querySelector('.password');
const confirmPassword = form.querySelector('.confirmPassword');
const redBorder = '#e60000';
const greyBorder = '#d3d3d3';
const signupUrl = 'https://emmaadesile-ridemyway.herokuapp.com/auth/signup';

// validate email
const validateEmail = checkMail => {
  const testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return testEmail.test(checkMail);
};

// request data
let formData = {};

// Get the form data
function getFormData() {
  for (const data of formFields) {
    formData[data.name] = data.value.trim();
  }
  return formData;
}

function showError(e) {
  const targetName = e.target.name;
  e.target.placeholder = `${targetName.slice(0, 1).toUpperCase()}${targetName.slice(1)} is required`;
}

function removeError(e) {
  const targetName = e.target.name;
  e.target.placeholder = `${targetName.slice(0, 1).toUpperCase()}${targetName.slice(1)}`;
}


const formFieldArray = [];
formFields.forEach(field => formFieldArray.push(field));

// check if form data are valid
function validateForm() {
  let isValid = false;
  
  formFields.forEach((field) => {
    field.style.borderColor = greyBorder;
    if (field.value === '' || field.value.trim() === '') {
      field.style.borderColor = redBorder;
      field.addEventListener('mouseenter', showError);
      field.addEventListener('mouseout', removeError);
      isValid = false;
    }
    else if (field.name === "email") {
      if (validateEmail(field.value) === false) {
        field.style.borderColor = redBorder;
        field.title = 'Email is invalid';
        isValid = false;
      }
    }
    else if (field.name === "password") {
      if (field.value > 2 && field.value.length < 6) {
        field.style.borderColor = redBorder;
        field.title = 'Password must be at least 6 characters long';
        isValid = false;
      }
      else if (field.value != confirmPassword.value) {
        password.style.borderColor = redBorder;
        confirmPassword.style.borderColor = redBorder;
        password.title = 'Password does not match';
        isValid = false;
      }
    }
  })
  isValid = formFieldArray.every(field => field.style.borderColor !== redBorder);
  return isValid;
}


// handle signup
function signupHandler(e) {
  e.preventDefault();

  if (validateForm() === false) return;
  
  loaderBg.style.display = "grid";

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
      loaderBg.style.display = "none";
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      message.style.display = "block";

      // show message after signup
      function doHide() {
        message.style.display = "none";
      }
      function hideMessage() {
        setTimeout(doHide, 5000);
      }

      // if success redirect to sign in page
      if (data.status === "Success") {
        message.style.backgroundColor = "#40ac01";
        message.innerHTML = data.message;
        // redirect to sign in page
        function redirect() {
          setTimeout(signinRedirect, 5000);
        }
        function signinRedirect() {
          window.location = './signin.html';
        }
        redirect();
      }
      if (data.status === "Failed") {
        message.innerHTML = JSON.stringify(data.status);
      }
      hideMessage();
    })
    .catch((error) => {
      console.log(error);
      message.innerHTML = JSON.stringify(error.error);
    });
}

// add event listener to sign up button
signupButton.addEventListener('click', validateForm);
signupButton.addEventListener('click', signupHandler);