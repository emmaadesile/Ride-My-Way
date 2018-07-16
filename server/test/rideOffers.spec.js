import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import pool from '../models/dbConfig';

chai.use(chaiHttp);

describe('Tests for Rides Endpoints', () => {
  before((done) => {
  const newUser = {
    firstname: 'adekunle',
    lastname: 'gold',
    username: 'adekunlegold',
    email: 'adekunlegold@gmail.com',
    password: 'adekunlegold',
    confirmPassword: 'adekunlegold'
  };
  chai.request(app)
    .post('/auth/signup')
    .send(newUser)
    .end((err, res) => {
      expect(res).to.have.status(201);
      expect(res.body.status).to.equal('Success');
      expect(res.body.message).to.equal('Sign up successful');
      expect(res.body).to.have.property('token');
      expect(res.body.token).to.be.a('string');
    });
    done();
});
  let token;
  before((done) => {
    //===================================================
    const existingUser = {
      email: 'adekunlegold@gmail.com',
      password: 'adekunlegold',
    };
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
        .set('x-access-token', token)
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
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('Success');
          expect(res.body.ride).to.be.an('array');
          done();
        });
    });
  });
});
