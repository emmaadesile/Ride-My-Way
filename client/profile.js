const profileName = document.querySelector('.profile-name');
const signoutButton = document.querySelector('.signout-btn');
const userToken = sessionStorage.getItem('x-access-token');
const ridesButton = document.querySelector('.btn-rides');
const rides = [];
const requests = [];
const ridesGivenDetails = document.querySelector('.rides__given-details');
const ridesTakenDetails = document.querySelector('.rides__taken-details');
const ridesGivenCount = document.querySelector('.rides-given-num');
const ridesTakenCount = document.querySelector('.rides-taken-num');
const ridesUrl = 'https://emmaadesile-ridemyway.herokuapp.com/rides';
const ridesTakenUrl = 'https://emmaadesile-ridemyway.herokuapp.com/users/requests';
// const ridesTakenUrl = 'http://localhost:8000/users/requests';
// const ridesUrl = 'http://localhost:8000/rides';

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

// request details for getting all rides
const ridesGivenParams = {
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

function ridesGiven() {
  const request = new Request(ridesUrl, ridesGivenParams);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        rides.push(...data.rides)
        if (data.rides.length === 0) {
          ridesGivenDetails.innerHTML = `
          <h6> There are no rides <h6>
          `;
        }
        // This counts the number of rides a user has given
        const count = data.rides.filter(ride => ride.user_id === userId);
        ridesGivenCount.textContent = count.length;

        data.rides.map((ride) => {
          if (ride.user_id === userId) {
            ridesGivenDetails.innerHTML += `
              <div class='ride-detail'>
                <h5>${ride.location} to ${ride.destination}</h5>
                <p>Date-Given: ${ride.datecreated.slice(0, 10)}</p>
              </div>
            `;
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
ridesGiven();


/**
 * shows the num of ride taken and given
 * @param {obj} req
 * @param {obj} res
 * @returns a ride taken and given count
 */

// request details for getting all requests
const ridesTakenParams = {
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

function ridesTaken() {
  const request = new Request(ridesTakenUrl, ridesTakenParams);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        console.log(data.requests);
        ridesTakenCount.textContent = data.requests.length;
        requests.push(...data.requests);
        rides.map((ride) => {
          requests.map((request) => {
            if (ride.ride_id === request.ride_id) {
              console.log(ride);
              ridesTakenDetails.innerHTML += `
                <div class='ride-detail'>
                  <h5>${ride.location} to ${ride.destination}</h5>
                  <p>Date Taken: ${ride.datecreated.slice(0, 10)}</p>
                  <p class='request-status'>Status: ${request.request_status}</p>
                </div>
              `;
            }
          })
        })
      }
    })
    .catch(error => console.log(error));
}
ridesTaken();


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
