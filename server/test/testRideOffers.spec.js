import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import rideData from './testData/rideData';
import app from '../app';

chai.use(chaiHttp);

describe('Test for Ride Offers Endpoints', () => {
  // *GET =======================================================
  // Returns all ride offers
  it('should return all rides /rides GET', (done) => {
    chai.request(app)
      .get('/api/v1/rides')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Returns a single ride offer
  it('should return a single ride /rides/rideId GET', (done) => {
    chai.request(app)
      .get('/api/v1/rides/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.location).to.equal('Ikeja');
        expect(res.body.destination).to.equal('Victoria Island');
        expect(res.body.timeOfDeparture).to.equal('1:00pm');
        expect(res.body.price).to.equal(400);
        expect(res.body.createdAt).to.equal('21-07-2018');
        expect(res.body.expiresAt).to.equal('21-07-2018');
        done();
      });
  });

  // *POST ==================================================================

  // Post a ride offer
  it('post a ride offer /rides POST', (done) => {
    chai.request(app)
      .post('/api/v1/rides')
      .send(rideData[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  // Does not post ride if any of the fields are missing
  it('should not post ride if any field is missing /rides POST', (done) => {
    chai.request(app)
      .post('/api/v1/rides')
      .send(rideData[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Please fill all the required fields');
        done();
      });
  });


  // Post request to join a ride
  it('post a request to join a ride /rides POST', (done) => {
    chai.request(app)
      .post('/api/v1/rides/1/requests')
      .end((err, res) => {
        expect(res).to.have.status(202);
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.equal('Ride request accepted');
        done();
      });
  });

  // Reject ride request if there are no more seats available
  it('should reject ride request if the seats are full /rides POST', (done) => {
    chai.request(app)
      .post('/api/v1/rides/3/requests')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Ride request rejected. No more seats available');
        done();
      });
  });

  // ===================================================================================
});
