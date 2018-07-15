import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
import pool from '../models/dbConfig';

chai.use(chaiHttp);

describe('Tests for Rides Endpoints', () => {
  let token;
  beforeEach((done) => {
    const existingUser = {
      email: 'reekadobanks@gmail.com',
      password: 'reekadobanks',
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
    // it('Gets a single ride for an authenticated user', (done) => {
    //   chai.request(app)
    //     .get('/rides/1')
    //     .set('x-access-token', token)
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.have.property('status');
    //       expect(res.body.status).to.equal('Success');
    //       expect(res.body.rides).to.be.an('array');
    //       expect(res.body.rides[0]).to.have.property('ride_id');
    //       expect(res.body.rides[0]).to.have.property('user_id');
    //       expect(res.body.rides[0]).to.have.property('location');
    //       expect(res.body.rides[0]).to.have.property('destination');
    //       expect(res.body.rides[0]).to.have.property('departuretime');
    //       expect(res.body.rides[0]).to.have.property('datecreated');
    //       done();
    //     });
    // });
  });
});
