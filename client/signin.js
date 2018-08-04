const form = document.querySelector('.form');
const formFields = form.querySelectorAll('input');
const email = form.querySelector('.email');
const password = form.querySelector('.password');
const signinButton = document.querySelector('.signin-btn');
const loaderBg = document.querySelector('.loader-bg');
const message = document.querySelector('.message');

const signinUrl = 'https://emmaadesile-ridemyway.herokuapp.com/auth/signin';

// validate email
const validateEmail = (checkMail) => {
  const testEmail = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return testEmail.test(checkMail);
};

// check if there errors during signin
function isEmpty(obj) {
  const keys = Object.keys(obj);
  return keys;
}

// Sign in validation
function validateSignin() {
  let isValid;
  const error = {};
  if (email.value === '') {
    error.email = 'Email is required';
  }
  if (email.value && validateEmail(email.value) === false) {
    error.email = 'Email address is invalid';
  }
  if (password.value === '') {
    error.password = 'Password is required';
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

// form data
const formData = {};

// Get the form data
function getFormData() {
  for (const data of formFields) {
    formData[data.name] = data.value.trim();
  }
  return formData;
}

// Signin handler
function signinHandler(e) {
  e.preventDefault();

  // check if signin form is valid
  if (validateSignin() === false) return;

  const loading = setTimeout(() => {
    loaderBg.style.display = 'grid';
  }, 100);

  if (window.navigator.onLine === false) {
    clearTimeout(loading);
  }

  fetch(signinUrl, {
    method: 'POST',
    body: JSON.stringify(getFormData()),
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json, text`/plain, text/html;',
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
      // remove message from form
      function showMessage() {
        message.style.display = 'block';
      }
      function removeMessage() {
        setTimeout(() => {
          message.style.display = 'none';
        }, 5000);
      }
      // redirect to user profile page
      function signinRedirect() {
        window.location = './user-profile.html';
      }
      function redirect() {
        setTimeout(signinRedirect, 2000);
      }

      // if signin was successful
      if (data.status === 'Success') {
        loaderBg.style.display = 'grid';
        const token = data.userToken;
        sessionStorage.setItem('x-access-token', token);
        redirect();
      }
      // if user does not exist
      if (data.error === 'User does not exist') {
        showMessage();
        message.innerHTML = data.error;
        removeMessage();
      }
      if (data.error === 'Invalid login credentials') {
        showMessage();
        message.innerHTML = data.error;
        removeMessage();
      }
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        loaderBg.style.display = "none;"
      }
      console.log(error);
    });
}

signinButton.addEventListener('click', signinHandler);
