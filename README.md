# Ride-My-Way

[![Build Status](https://travis-ci.org/emmaadesile/Ride-My-Way.svg?branch=develop)](https://travis-ci.org/emmaadesile/Ride-My-Way) [![Coverage Status](https://coveralls.io/repos/github/emmaadesile/Ride-My-Way/badge.svg?branch=ft%2F%23158974064%2Ftest-api-endpoints)](https://coveralls.io/github/emmaadesile/Ride-My-Way?branch=ft%2F%23158974064%2Ftest-api-endpoints) [![Maintainability](https://api.codeclimate.com/v1/badges/a745f7b804d4b7bb491d/maintainability)](https://codeclimate.com/github/emmaadesile/Ride-My-Way/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/a745f7b804d4b7bb491d/test_coverage)](https://codeclimate.com/github/emmaadesile/Ride-My-Way/test_coverage)

Ride My Way is a carpooling application that allows users to post ride offers and request to join a ride offer.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prequesites

You need nodejs version 8 and above to run this app.

### Installing

To install the dependencies run

```
npm install
```

## Stating the Server

To start the development server

```
npm run start:dev
```

To start production server
```
npm run start
```

## API Documentation
Full documentation for the api endpoints in available [here](https://emmaadesile.github.io/ridemyway-docs/build/index.html)

## API Endpoints

| ------ | ---------------------------------------- | -------------------------- |
| Method | Route                                    | Action                     |
| POST   | `api/v1/signup`                          | Sign up                    |
| POST   | `api/v1/signin`                          | Sign in                    |
| GET    | `api/v1/rides`                           | Get all rides              |
| POST   | `api/v1/users/rides`                     | Post a ride                |
| POST   | `api/v1/rides/:rideId/requests`          | Make a ride request        |
| GET    | `api/v1/users/rides/:rideId/requests`    | Get requests for a ride    |
| PUT    | `api/v1/users/:rideId/requests/:requestId` | Accept or reject a request |



## Running the tests

To run tests

```
npm run test:localdb
```

## 

## Deployment
You can view the live server on https://emmaadesile-ridemyway.herokuapp.com

## Built With

[Express](https://expressjs.com/) -Nodejs web framework

[Postgres](https://www.postgresql.org/) - Database for the app

[Travis](https://travis-ci.org) - Continuous Integration

[JWT](https://jwt.io) - Token based authentication

### License

This project is licensed under the MIT License - see the [LICENSE.md](https://gist.github.com/PurpleBooth/LICENSE.md) file for details
