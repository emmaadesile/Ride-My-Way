import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../app';
import pool from '../models/dbConfig';

chai.use(chaiHttp);

describe('Tests for Rides Endpoints', () => {
  describe('Get all rides and a single ride', () => {
    let token;
    before((done) => {
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
  
    it('Gets all rides for an authenticated user', (done) => {
      chai.request(app)
        .get('/rides')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('ride_id');
          // expect(res).text.have.property('user_id');
          // expect(res).text.have.property('location');
          // expect(res).text.have.property('destination');
          // expect(res).text.have.property('departuretime');
          // expect(res).text.have.property('datecreated');
          done();
        });
    });
  });
});
