const profileName = document.querySelector('.profile-name');
const signoutButton = document.querySelector('.signout-btn');
const userToken = sessionStorage.getItem('x-access-token');
const ridesButton = document.querySelector('.btn-rides');

// get user info from token
function decodeToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

// get the users info from the token provided
const userInfo = decodeToken(userToken);
const userId = userInfo.userId.user_id;
const firstname = userInfo.userId.firstname;
const lastname = userInfo.userId.lastname;
const fullname = `${firstname} ${lastname}`;
console.log(fullname);

/**
 * Signs in a registered user
 * @param {obj} req
 * @param {obj} res
 * @returns a users profile
 */
function loadProfile() {
  profileName.textContent = fullname;
}

loadProfile();

// rides button redirects to rides page
function ridesPageRedirect() {
  window.location('./rides.html');
}

// sign out function
function signout() {
  sessionStorage.clear();
  window.location('./signin.html');
}

// event listeners
ridesButton.addEventListener('click', ridesPageRedirect);
signoutButton.addEventListener('click', signout);
