// import chai from 'chai';
import chaiHttp from 'chai-http';
import chai, { expect, should } from 'chai';
import app from '../app';
import rideOffers from '../models/rideOffers';

should();
chai.use(chaiHttp);

describe('Test for Ride Offers Endpoints', () => {
  // Returns all ride offers
  it('returns all ride offers on /rideOffers GET', () => chai.request(app)
    .get('/rideOffers')
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    }));

  // Get a single ride offer
  it("returns a single ride offer on /rideOffers GET", () => chai.request(app)
    .get("rideOffers/:rideOfferId")
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an("object");
    }));
});
