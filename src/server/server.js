import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import api from './api';
import cfg from './config';
import AuthAPI from './auth';
import UsersAPI from './users';
import NotesAPI from './notes';

let app = express();
let db = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || cfg.port;

app.set('superSecret', cfg.apiSecret);

// ROUTES FOR THE API
// =============================================================================
let router = express.Router();

// test route to make sure everything is working
router.get('/', function(req, res) {
  api.json(res, { message: 'Welcome to our api!' });   
});

// let the auth API in
new AuthAPI(app, router, db, api);

// middleware to use for all requests
router.use((req, res, next) => authMiddleware(req, res, next));

// more routes for our API will happen here
new UsersAPI(app, router, db, api);
new NotesAPI(app, router, db, api);

// REGISTERING ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);

function authMiddleware(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      console.log(err);
      if (err) {
        return api.error(res, { message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next();
      }
    });
  } else {
    return api.error(res, { message: 'No token provided.' });
  }
}
