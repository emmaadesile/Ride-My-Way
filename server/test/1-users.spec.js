import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe.only('Tests homepage route GET /', () => {
  it('returns a success message on homepage', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.success).to.equal('Ride My Way API is live');
        done();
      });
  });
});

describe.only('Test for Sign up endpoint', () => {
  // This user will be the creator of the ride
  const newUser = {
    firstname: 'adekunle',
    lastname: 'gold',
    username: 'adekunlegold',
    email: 'adekunlegold@gmail.com',
    password: 'adekunlegold',
    confirmPassword: 'adekunlegold'
  };

  // This user will be the requester of the ride
  const newUser2 = {
    firstname: 'reekado',
    lastname: 'banks',
    username: 'reekadobanks',
    email: 'reekadobanks@gmail.com',
    password: 'reekadobanks',
    confirmPassword: 'reekadobanks'
  };

  describe('Tests for when all form fields are valid', () => {
    it('Signs up a new user(ride creator)', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Sign up successful');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });

    it('Signs up another new user(ride requester)', (done) => {
      chai.request(app)
        .post('/auth/signup')
        .send(newUser2)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Sign up successful');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.be.a('string');
          done();
        });
    });
  });

  describe('When any form field is empty or invalid', () => {
    // When user already exists
    it('returns an error if user already exists in database', (done) => {
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
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.error).to.equal('User already exists');
          done();
        });
    });

    // When firstname is empty
    it('returns an error if firstname is empty', (done) => {
      const newUser = {
        firstname: '',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.firstname).to.equal('Firstname field cannot be empty');
          done();
        });
    });

    // When lastname is empty
    it('returns an error if lastname is empty', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: '',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.lastname).to.equal('Lastname field cannot be empty');
          done();
        });
    });

    // When username is empty
    it('returns an error if username is empty', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: '',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.username).to.equal('Username field cannot be empty');
          done();
        });
    });

    // When email is empty
    it('returns an error if email is empty', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: undefined,
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.email).to.equal('Email address is invalid');
          done();
        });
    });

    // When password and confirm password is empty
    it('returns an error if password && confirmPassword is empty', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: undefined,
        password: '',
        confirmPassword: ''
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.password).to.equal('Password and confirm password fields do not match');
          expect(res.body.confirmPassword).to.equal('Please confirm your password');
          done();
        });
    });

    // When password is provided  and confirm password is empty
    it('returns an error if password is provided and confirm password is empty', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: ''
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.confirmPassword).to.equal('Please confirm your password');
          expect(res.body.password).to.equal('Password and confirm password fields do not match');
          done();
        });
    });

    // When email is invalid
    it('returns error if email is invalid', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: ''
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res).to.have.property('status');
          expect(res.body.status).to.equal('Failed');
          expect(res.body.email).to.equal('Email address is invalid');
          done();
        });
    });

    // When extra spaces are added to firtname
    it('returns error if extra space(s) is added to firstname', (done) => {
      const newUser = {
        firstname: 'Dele ',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.firstname).to.equal('Please remove extra space(s) added to the firstname');
          done();
        });
    });

    // When extra spaces are added to lastname
    it('returns error if extra space(s) is added to lastname', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu ',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.lastname).to.equal('Please remove extra space(s) added to the lastname');
          done();
        });
    });

    // When extra spaces are added to username
    it('returns error if extra space(s) is added to username', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag ',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.username).to.equal('Please remove extra space(s) added to the username');
          done();
        });
    });

    // When firstname has invalid chars
    it('returns error if firstname has invalid chars', (done) => {
      const newUser = {
        firstname: 'Dele%^',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.error).to.equal('Firstname can only contain numbers and letters');
          done();
        });
    });

    // When lastname has invalid chars
    it('returns error if lastname has invalid chars', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu%^',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.error).to.equal('Lastname can only contain numbers and letters');
          done();
        });
    });

    // When username has invalid chars
    it('returns error if username has invalid chars', (done) => {
      const newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag%^',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      chai.request(app)
        .post('/auth/signup')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body.status).to.equal('Failed');
          expect(res.body.error).to.equal('Username can only contain numbers and letters');
          done();
        });
    });
  });
});
  
// Sign in ===================================================================
describe.only('Test for Sign in endpoint', () => {
  // Password not provided
  it('returns an error if password is not provided', (done) => {
    const exisitingUser = {
      email: 'adekunlegold@gmail.com',
      password: '',
    };
    chai.request(app)
      .post('/auth/signin')
      .send(exisitingUser)
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.password).to.equal('Password is required');
        done();
      });
  });

  // Email not provided
  it('returns an error if email is not provided', (done) => {
    const exisitingUser = {
      email: '',
      password: 'adekunle',
    };
    chai.request(app)
      .post('/auth/signin')
      .send(exisitingUser)
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.email).to.equal('Email is required');
        done();
      });
  });

  // Password and email is not provided
  it('returns an error if email && password are not provided', (done) => {
    const exisitingUser = {
      email: '',
      password: '',
    };
    chai.request(app)
      .post('/auth/signin')
      .send(exisitingUser)
      .end((err, res) => {
        expect(res).to.have.status(406);
        expect(res.body.email).to.equal('Email is required');
        expect(res.body.password).to.equal('Password is required');
        done();
      });
  });
});

