var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_chai2['default'].use(_chaiHttp2['default']);

describe.only('Tests for Rides Endpoints', function () {
  // Ride offer creator
  var existingUser = {
    email: 'adekunlegold@gmail.com',
    password: 'adekunlegold'
  };

  // User which requests to join ride
  var existingUser2 = {
    email: 'reekadobanks@gmail.com',
    password: 'reekadobanks'
  };

  var token = void 0;
  var requestToken = void 0;

  // Hook for the creator of the ride
  before(function (done) {
    _chai2['default'].request(_app2['default']).post('/auth/signin').send(existingUser).end(function (err, res) {
      token = res.body.userToken;
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.status).to.equal('Success');
      (0, _chai.expect)(res.body.message).to.equal('Login Successful');
      (0, _chai.expect)(res.body.userToken).to.be.a('string');
      done();
    });
  });

  // Hook for requester of ride
  before(function (done) {
    _chai2['default'].request(_app2['default']).post('/auth/signin').send(existingUser2).end(function (err, res) {
      requestToken = res.body.userToken;
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.status).to.equal('Success');
      (0, _chai.expect)(res.body.message).to.equal('Login Successful');
      (0, _chai.expect)(res.body.userToken).to.be.a('string');
      done();
    });
  });

  describe('Tests for Create ride endpoint', function () {
    // Registered user can create ride
    it('Creates a ride for an authenticated user', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.status).to.equal('Success');
        (0, _chai.expect)(res.body.message).to.equal('Ride offer successfully created');
        done();
      });
    });

    // Unregistered user cannot create ride
    it('returns error if token is not provided', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(403);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.status).to.be.equal('Failed');
        (0, _chai.expect)(res.body.error).to.be.equal('User not authorised to access this page');
        done();
      });
    });

    // Returns error if location filed is missing
    it('returns error if location is missing', function (done) {
      var newRide = {
        location: '',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error.location).to.be.equal('Please enter the location');
        done();
      });
    });

    // Returns error if destination is missing
    it('returns error if destination is missing', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: '',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error.destination).to.be.equal('Please enter the destination');
        done();
      });
    });

    // Returns error if depaturetime is missing
    it('returns error if depaturetime is missing', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '',
        datecreated: '2018-07-15',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error.departuretime).to.be.equal('Please enter the departuretime');
        done();
      });
    });

    // Returns error if datecreated is missing
    it('returns error if datecreated is missing', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '',
        seatsavailable: 8
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error.datecreated).to.be.equal('Please enter the datecreated');
        done();
      });
    });
    // Returns error if seatsavailalbe is missing
    it('returns error if seatsavailable is missing', function (done) {
      var newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:20',
        datecreated: '2018-07-15',
        seatsavailable: undefined
      };
      _chai2['default'].request(_app2['default']).post('/users/rides').send(newRide).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body).to.have.property('error');
        (0, _chai.expect)(res.body.error.seatsavailable).to.be.equal('Seats available must be a number');
        done();
      });
    });
  });

  describe('Get all rides and a single ride', function () {
    // Get all rides
    it('Gets all rides for an authenticated user', function (done) {
      _chai2['default'].request(_app2['default']).get('/rides').set('x-access-token', requestToken).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Success');
        (0, _chai.expect)(res.body.rides).to.be.an('array');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('ride_id');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('user_id');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('location');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('destination');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('departuretime');
        (0, _chai.expect)(res.body.rides[0]).to.have.property('datecreated');
        done();
      });
    });

    // Get a single ride
    it('Gets a single ride for an authenticated user', function (done) {
      _chai2['default'].request(_app2['default']).get('/rides/1').set('x-access-token', requestToken).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Success');
        (0, _chai.expect)(res.body.ride).to.be.an('array');
        done();
      });
    });

    // Returns error if ride is not found
    it('Returns 404 error if ride is not found', function (done) {
      _chai2['default'].request(_app2['default']).get('/rides/10').set('x-access-token', requestToken).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(404);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.error).to.be.equal('Ride not found');
        done();
      });
    });
  });

  describe('Tests for ride requests', function () {
    it('returns 200 ok when user requests to join ride offer', function (done) {
      _chai2['default'].request(_app2['default']).post('/rides/1/requests').set('x-access-token', requestToken).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.message).to.be.equal('Request to join ride offer pending approval from ride owner');
        done();
      });
    });

    it('returns error if user tries to join ride that does not exist', function (done) {
      _chai2['default'].request(_app2['default']).post('/rides/10/requests').set('x-access-token', requestToken).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(400);
        (0, _chai.expect)(res.body.status).to.be.equal('Failed');
        (0, _chai.expect)(res.body.error).to.be.equal('Cannot request to join because ride does not exist');
        done();
      });
    });

    it('returns requests for a particular ride', function (done) {
      _chai2['default'].request(_app2['default']).get('/users/rides/1/requests').set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.status).to.be.equal('Success');
        (0, _chai.expect)(res.body.request).to.have.property('id');
        (0, _chai.expect)(res.body.request).to.have.property('ride_id');
        (0, _chai.expect)(res.body.request).to.have.property('user_id');
        (0, _chai.expect)(res.body.request).to.have.property('request_id');
        (0, _chai.expect)(res.body.request).to.have.property('request_status');
        (0, _chai.expect)(res.body.request).to.have.property('requester_name');
        done();
      });
    });

    it('returns request status after ride owner responds to request', function (done) {
      var requestStatus = {
        requestStatus: 'accepted'
      };
      _chai2['default'].request(_app2['default']).put('/users/rides/1/requests/2').send(requestStatus).set('x-access-token', token).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        (0, _chai.expect)(res.body.message).to.be.equal('The ride request has been successfully accepted');
        done();
      });
    });
  });
});