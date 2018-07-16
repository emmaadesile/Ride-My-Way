// import './users.spec.js';
// import './rideOffers.spec.js';

// beforeEach((done) => {
//   const newUser = {
//     firstname: 'adekunle',
//     lastname: 'gold',
//     username: 'adekunlegold',
//     email: 'adekunlegold@gmail.com',
//     password: 'adekunlegold',
//     confirmPassword: 'adekunlegold'
//   };
//   chai.request(app)
//     .post('/auth/signup')
//     .send(newUser)
//     .end((err, res) => {
//       expect(res).to.have.status(201);
//       expect(res.body.status).to.equal('Success');
//       expect(res.body.message).to.equal('Sign up successful');
//       expect(res.body).to.have.property('token');
//       expect(res.body.token).to.be.a('string');
//       done();
//     });
// });