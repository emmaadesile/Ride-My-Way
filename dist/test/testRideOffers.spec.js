var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _rideData = require('./testData/rideData');

var _rideData2 = _interopRequireDefault(_rideData);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_chai2['default'].use(_chaiHttp2['default']);

describe('Test for Ride Offers Endpoints', function () {
  // *GET =======================================================
  // Returns all ride offers
  it('should return all rides /rides GET', function (done) {
    _chai2['default'].request(_app2['default']).get('/api/v1/rides').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('array');
      done();
    });
  });

  // Returns a single ride offer
  it('should return a single ride /rides/rideId GET', function (done) {
    _chai2['default'].request(_app2['default']).get('/api/v1/rides/1').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body).to.be.an('array');
      (0, _chai.expect)(res.body.location).to.equal('Ikeja');
      (0, _chai.expect)(res.body.destination).to.equal('Victoria Island');
      (0, _chai.expect)(res.body.timeOfDeparture).to.equal('1:00pm');
      (0, _chai.expect)(res.body.price).to.equal(400);
      (0, _chai.expect)(res.body.createdAt).to.equal('21-07-2018');
      (0, _chai.expect)(res.body.expiresAt).to.equal('21-07-2018');
      done();
    });
  });

  // *POST ==================================================================

  // Post a ride offer
  it('post a ride offer /rides POST', function (done) {
    _chai2['default'].request(_app2['default']).post('/api/v1/rides').send(_rideData2['default'][0]).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });

  // Does not post ride if any of the fields are missing
  it('should not post ride if any field is missing /rides POST', function (done) {
    _chai2['default'].request(_app2['default']).post('/api/v1/rides').send(_rideData2['default'][1]).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal('Please fill all the required fields');
      done();
    });
  });

  // Post request to join a ride
  it('post a request to join a ride /rides POST', function (done) {
    _chai2['default'].request(_app2['default']).post('/api/v1/rides/1/requests').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(202);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.success).to.equal('Ride request accepted');
      done();
    });
  });

  // Reject ride request if there are no more seats available
  it('should reject ride request if the seats are full /rides POST', function (done) {
    _chai2['default'].request(_app2['default']).post('/api/v1/rides/3/requests').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(400);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.error).to.equal('Ride request rejected. No more seats available');
      done();
    });
  });

  // ===================================================================================
});