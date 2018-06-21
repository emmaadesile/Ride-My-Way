import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../app';

chai.use(chaiHttp);

describe('Test for Ride Offers Endpoints', () => {
  // Test for the get endpoints =======================================================
  // Returns all ride offers
  it('returns all ride offers on api/rideOffers GET', done => chai.request(app)
    .get('/rideOffers')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      done();
    }));

  // ===================================================================================
});
