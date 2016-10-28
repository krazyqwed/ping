import Datastore from 'nedb';
import md5 from 'js-md5';
import jwt from 'jsonwebtoken';

import cfg from './config';

class AuthAPI {
  constructor(app, router, db, api) {
    db.users = new Datastore({ filename: './db/users.db' });
    db.users.loadDatabase();

    router.post('/auth', function(req, res) {
      db.users.findOne({
        email: req.body.email,
        password: md5(req.body.password + cfg.passwordSalt)
      }, function (err, data) {
        if (err) throw err;

        if (!data) {
          return api.error(res, { message: 'User not found!' });
        } else {
          let token = jwt.sign({
            id: data.id,
            role: data.role
          }, app.get('superSecret'), {
            expiresIn: 1440
          });

          return api.json(res, { token: token });
        }
      });
    });
  }
}

export default AuthAPI;
