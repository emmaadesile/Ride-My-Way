const profileName = document.querySelector('.profile-name');
const signoutButton = document.querySelector('.signout-btn');
const userToken = sessionStorage.getItem('x-access-token');
const ridesButton = document.querySelector('.btn-rides');
const ridesTaken = document.querySelector(".rides-taken");
const ridesGiventDetails = document.querySelector(".rides__given-details");
const ridesGivenCount = document.querySelector(".rides-given-num");
const ridesTakenCount = document.querySelector(".rides-taken-num");
const ridesUrl = "https://emmaadesile-ridemyway.herokuapp.com/rides";

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
 * Loads profile of a user
 * @param {obj} req
 * @param {obj} res
 * @returns a users profile
 */
function loadProfile() {
  profileName.textContent = fullname;
}

loadProfile();

/**
 * shows the num of ride taken and given
 * @param {obj} req
 * @param {obj} res
 * @returns a ride taken and given count
 */
// function ridesTaken() {

// }
// ridesTaken();

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

/**
 * shows the num of ride taken and given
 * @param {obj} req
 * @param {obj} res
 * @returns a ride taken and given count
 */
function ridesGiven() {
  const request = new Request(ridesUrl, requestDetails);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        if (data.rides.length === 0) {
          ridesGiventDetails.innerHTML = `
          <h6> There are no rides <h6>
          `;
        }
        // This counts the number of rides a user has given
        const count = data.rides.filter(ride => ride.user_id === userId);
        ridesGivenCount.textContent = count.length;

        data.rides.filter((ride) => {
          if (ride.user_id === userId) {
            ridesGiventDetails.innerHTML += `
              <div class="ride-details">
                <h5>${ride.location} to ${ride.destination}</h5>
                <p>Date-Given: ${ride.datecreated.slice(0, 10)}</p>
              </div>
            `;
          }
          else {
            ridesGiventDetails.innerHTML = `
              <p>You have not created any ride</p>
            `;
          }
        });
      }
    })
    .catch((error) => {
      console.log({ error });
    });
}

ridesGiven();

// rides button redirects to rides page
function ridesPageRedirect() {
  window.location('./rides.html');
}

// sign out function
function signout() {
  sessionStorage.clear();
  window.location = './signin.html';
}

// event listeners
ridesButton.addEventListener('click', ridesPageRedirect);
signoutButton.addEventListener('click', signout);
