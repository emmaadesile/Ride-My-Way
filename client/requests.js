const userToken = sessionStorage.getItem('x-access-token');
// rides url
const ridesUrl = 'https://emmaadesile-ridemyway.herokuapp.com/rides';

let rideRequestsUrl;
// url for responding to ride requests
let rideRequestResponsesUrl;
let rides = [];
let rideIdArray = [];
const rideRequestArray = [];
let rideRequests = document.querySelector('.ride-requests');
let acceptButton;
let rejectButton;

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

// request details to get all rides
const ridesParams = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    Accept: 'application/json, text`/plain, text/html;',
    'x-access-token': userToken,
  })
};

// request details for getting all ride requests
const ridesRequestParams = {
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

// get the ride ids of all the ride created by me
function getAllRideRequests() {
  rideIdArray = [];
  const request = new Request(ridesUrl, ridesParams);

  fetch(request)
    .then(resp => resp.json())
    .then((data) => {
      if (data.status === 'Success') {
        data.rides.filter((ride) => {
          if (ride.user_id === userId) {
            rideIdArray.push(ride.ride_id);
            rides.push(ride);
          }
        });
        if (rides.length === 0) {
          rideRequests.innerHTML += `
            <div class='box__group ride-request'>
              <div class='request-details'>
                <h6>No ride notifications because you have not created any ride</h6>
              </div>
            </div>
          `;
        }
      }
    })
    .then(() => {
      // get the requests for each ride using the ride id
      rideIdArray.map((rideId) => {
        rideRequestsUrl = `https://emmaadesile-ridemyway.herokuapp.com/users/rides/${rideId}/requests`;
        fetch(rideRequestsUrl, ridesRequestParams)
          .then(resp => resp.json())
          .then((data) => {
            if (data.status === 'Success') {
              rideRequestArray.push(data.request);
              data.request.map((ride, index) => {
                rideRequests.innerHTML += `                  
                  <div class='box__group ride-request'>
                    <div class='request-details'>
                      <h5>${rides[index].location} to ${rides[index].destination}</h5>
                      <p>Departure Time: ${rides[index].departuretime.slice(0, 5)}</p>
                      <p>Seats Available: ${rides[index].seatsavailable}</p>
                      <p>Requester: ${ride.requester_name}</p>
                      <span class='request-status'>${ride.request_status}</span>
                    </div>
                    <div class='request-btns'>
                      <a class='btn btn__secondary'>Accept</a>
                      <a class='btn btn__grey'>Reject</a>
                    </div>
                  </div>
                `;
              });
            }
            rideRequests.innerHTML += `
              <div class='box__group ride-request'>
                <div class='request-details'>
                  <h6>You have no ride notifications for your ride(s)</h6>
                </div>
              </div>
            `;
            console.log(data);
          })
          .catch(error => console.log(error));
      });
    })
    .catch(error => console.log(error));
}
getAllRideRequests();

// respond to ride requests
function respontoRideRequests() {

}