var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

_chai2['default'].use(_chaiHttp2['default']);

describe.only('Tests homepage route GET /', function () {
  it('returns a success message on homepage', function (done) {
    _chai2['default'].request(_app2['default']).get('/').end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      (0, _chai.expect)(res.body.success).to.equal('Ride My Way API is live');
      done();
    });
  });
});

describe.only('Test for Sign up endpoint', function () {
  // This user will be the creator of the ride
  var newUser = {
    firstname: 'adekunle',
    lastname: 'gold',
    username: 'adekunlegold',
    email: 'adekunlegold@gmail.com',
    password: 'adekunlegold',
    confirmPassword: 'adekunlegold'
  };

  // This user will be the requester of the ride
  var newUser2 = {
    firstname: 'reekado',
    lastname: 'banks',
    username: 'reekadobanks',
    email: 'reekadobanks@gmail.com',
    password: 'reekadobanks',
    confirmPassword: 'reekadobanks'
  };

  describe('Tests for when all form fields are valid', function () {
    it('Signs up a new user(ride creator)', function (done) {
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.status).to.equal('Success');
        (0, _chai.expect)(res.body.message).to.equal('Sign up successful');
        (0, _chai.expect)(res.body).to.have.property('token');
        (0, _chai.expect)(res.body.token).to.be.a('string');
        done();
      });
    });

    it('Signs up another new user(ride requester)', function (done) {
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser2).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(201);
        (0, _chai.expect)(res.body.status).to.equal('Success');
        (0, _chai.expect)(res.body.message).to.equal('Sign up successful');
        (0, _chai.expect)(res.body).to.have.property('token');
        (0, _chai.expect)(res.body.token).to.be.a('string');
        done();
      });
    });
  });

  describe('When any form field is empty or invalid', function () {
    // When user already exists
    it('returns an error if user already exists in database', function (done) {
      var newUser = {
        firstname: 'adekunle',
        lastname: 'gold',
        username: 'adekunlegold',
        email: 'adekunlegold@gmail.com',
        password: 'adekunlegold',
        confirmPassword: 'adekunlegold'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(500);
        (0, _chai.expect)(res.body).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.error).to.equal('User already exists');
        done();
      });
    });

    // When firstname is empty
    it('returns an error if firstname is empty', function (done) {
      var newUser = {
        firstname: '',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.firstname).to.equal('Firstname field cannot be empty');
        done();
      });
    });

    // When lastname is empty
    it('returns an error if lastname is empty', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: '',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.lastname).to.equal('Lastname field cannot be empty');
        done();
      });
    });

    // When username is empty
    it('returns an error if username is empty', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: '',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.username).to.equal('Username field cannot be empty');
        done();
      });
    });

    // When email is empty
    it('returns an error if email is empty', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: undefined,
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.email).to.equal('Email address is invalid');
        done();
      });
    });

    // When password and confirm password is empty
    it('returns an error if password && confirmPassword is empty', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: undefined,
        password: '',
        confirmPassword: ''
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.password).to.equal('Password and confirm password fields do not match');
        (0, _chai.expect)(res.body.confirmPassword).to.equal('Please confirm your password');
        done();
      });
    });

    // When password is provided  and confirm password is empty
    it('returns an error if password is provided and confirm password is empty', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: ''
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.confirmPassword).to.equal('Please confirm your password');
        (0, _chai.expect)(res.body.password).to.equal('Password and confirm password fields do not match');
        done();
      });
    });

    // When email is invalid
    it('returns error if email is invalid', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: ''
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res).to.have.property('status');
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.email).to.equal('Email address is invalid');
        done();
      });
    });

    // When extra spaces are added to firtname
    it('returns error if extra space(s) is added to firstname', function (done) {
      var newUser = {
        firstname: 'Dele ',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.firstname).to.equal('Please remove extra space(s) added to the firstname');
        done();
      });
    });

    // When extra spaces are added to lastname
    it('returns error if extra space(s) is added to lastname', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu ',
        username: 'Ovationmag',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.lastname).to.equal('Please remove extra space(s) added to the lastname');
        done();
      });
    });

    // When extra spaces are added to username
    it('returns error if extra space(s) is added to username', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag ',
        email: 'ovationmag@',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.username).to.equal('Please remove extra space(s) added to the username');
        done();
      });
    });

    // When firstname has invalid chars
    it('returns error if firstname has invalid chars', function (done) {
      var newUser = {
        firstname: 'Dele%^',
        lastname: 'Momodu',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.error).to.equal('Firstname can only contain numbers and letters');
        done();
      });
    });

    // When lastname has invalid chars
    it('returns error if lastname has invalid chars', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu%^',
        username: 'Ovationmag',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.error).to.equal('Lastname can only contain numbers and letters');
        done();
      });
    });

    // When username has invalid chars
    it('returns error if username has invalid chars', function (done) {
      var newUser = {
        firstname: 'Dele',
        lastname: 'Momodu',
        username: 'Ovationmag%^',
        email: 'ovationmag@gmail.com',
        password: 'ovation',
        confirmPassword: 'ovation'
      };
      _chai2['default'].request(_app2['default']).post('/auth/signup').send(newUser).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(406);
        (0, _chai.expect)(res.body.status).to.equal('Failed');
        (0, _chai.expect)(res.body.error).to.equal('Username can only contain numbers and letters');
        done();
      });
    });
  });
});

// Sign in ===================================================================
describe.only('Test for Sign in endpoint', function () {
  // Password not provided
  it('returns an error if password is not provided', function (done) {
    var exisitingUser = {
      email: 'adekunlegold@gmail.com',
      password: ''
    };
    _chai2['default'].request(_app2['default']).post('/auth/signin').send(exisitingUser).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(406);
      (0, _chai.expect)(res.body.password).to.equal('Password is required');
      done();
    });
  });

  // Email not provided
  it('returns an error if email is not provided', function (done) {
    var exisitingUser = {
      email: '',
      password: 'adekunle'
    };
    _chai2['default'].request(_app2['default']).post('/auth/signin').send(exisitingUser).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(406);
      (0, _chai.expect)(res.body.email).to.equal('Email is required');
      done();
    });
  });

  // Password and email is not provided
  it('returns an error if email && password are not provided', function (done) {
    var exisitingUser = {
      email: '',
      password: ''
    };
    _chai2['default'].request(_app2['default']).post('/auth/signin').send(exisitingUser).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(406);
      (0, _chai.expect)(res.body.email).to.equal('Email is required');
      (0, _chai.expect)(res.body.password).to.equal('Password is required');
      done();
    });
  });
});