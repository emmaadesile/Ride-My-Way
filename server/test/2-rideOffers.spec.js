import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe.only('Tests for Rides Endpoints', () => {
  // Ride offer creator
  const existingUser = {
    email: 'adekunlegold@gmail.com',
    password: 'adekunlegold',
  };

  // User which requests to join ride
  const existingUser2 = {
    email: 'reekadobanks@gmail.com',
    password: 'reekadobanks',
  };

  let token;
  let requestToken;

  // Hook for the creator of the ride
  before((done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(existingUser)
      .end((err, res) => {
        token = res.body.userToken;
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('Success');
        expect(res.body.message).to.equal('Login Successful');
        expect(res.body.userToken).to.be.a('string');
        done();
      });
  });

  // Hook for requester of ride
  before((done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(existingUser2)
      .end((err, res) => {
        requestToken = res.body.userToken;
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('Success');
        expect(res.body.message).to.equal('Login Successful');
        expect(res.body.userToken).to.be.a('string');
        done();
      });
  });

  describe('Tests for Create ride endpoint', () => {
    // Registered user can create ride
    it('Creates a ride for an authenticated user', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Ride offer successfully created');
          done();
        });
    });

    // Unregistered user cannot create ride
    it('returns error if token is not provided', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.be.equal('Failed');
          expect(res.body.error).to.be.equal('User not authorised to access this page');
          done();
        });
    });

    // Returns error if location filed is missing
    it('returns error if location is missing', (done) => {
      const newRide = {
        location: '',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error.location).to.be.equal('Please enter the location');
          done();
        });
    });

    // Returns error if destination is missing
    it('returns error if destination is missing', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: '',
        departuretime: '19:00',
        datecreated: '2018-07-15',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error.destination).to.be.equal('Please enter the destination');
          done();
        });
    });

    // Returns error if depaturetime is missing
    it('returns error if depaturetime is missing', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '',
        datecreated: '2018-07-15',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error.departuretime).to.be.equal('Please enter the departuretime');
          done();
        });
    });

    // Returns error if datecreated is missing
    it('returns error if datecreated is missing', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:00',
        datecreated: '',
        seatsavailable: 8,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error.datecreated).to.be.equal('Please enter the datecreated');
          done();
        });
    });
    // Returns error if seatsavailalbe is missing
    it('returns error if seatsavailable is missing', (done) => {
      const newRide = {
        location: 'Ikoyi',
        destination: 'Ajah',
        departuretime: '19:20',
        datecreated: '2018-07-15',
        seatsavailable: undefined,
      };
      chai.request(app)
        .post('/users/rides')
        .send(newRide)
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.have.property('error');
          expect(res.body.error.seatsavailable).to.be.equal('Seats available must be a number');
          done();
        });
    });
  });

  describe('Get all rides and a single ride', () => {
    // Get all rides
    it('Gets all rides for an authenticated user', (done) => {
      chai.request(app)
        .get('/rides')
        .set('x-access-token', requestToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('Success');
          expect(res.body.rides).to.be.an('array');
          expect(res.body.rides[0]).to.have.property('ride_id');
          expect(res.body.rides[0]).to.have.property('user_id');
          expect(res.body.rides[0]).to.have.property('location');
          expect(res.body.rides[0]).to.have.property('destination');
          expect(res.body.rides[0]).to.have.property('departuretime');
          expect(res.body.rides[0]).to.have.property('datecreated');
          done();
        });
    });

    // Get a single ride
    it('Gets a single ride for an authenticated user', (done) => {
      chai.request(app)
        .get('/rides/1')
        .set('x-access-token', requestToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('Success');
          expect(res.body.ride).to.be.an('array');
          done();
        });
    });

    // Returns error if ride is not found
    it('Returns 404 error if ride is not found', (done) => {
      chai.request(app)
        .get('/rides/10')
        .set('x-access-token', requestToken)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.error).to.be.equal('Ride not found');
          done();
        });
    });
  });

  describe('Tests for ride requests', () => {
    it('returns 200 ok when user requests to join ride offer', (done) => {
      chai.request(app)
        .post('/rides/1/requests')
        .set('x-access-token', requestToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.be.equal('Request to join ride offer pending approval from ride owner');
          done();
        });
    });

    // it('returns error if user tries to join ride that does not exist', (done) => {
    //   chai.request(app)
    //     .post('/rides/10/requests')
    //     .set('x-access-token', requestToken)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.body.status).to.be.equal('Failed');
    //       expect(res.body.error).to.be.equal('Cannot request to join because ride does not exist');
    //       done();
    //     });
    // });
  });
});
