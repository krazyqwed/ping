import Datastore from 'nedb';
import md5 from 'js-md5';

import { dataDeleteKeys } from './helpers';

class UsersAPI {
  constructor(app, router, db, api) {
    db.users = new Datastore({ filename: './db/users.db' });
    db.users.loadDatabase();

    // let data = {
    //   id: '2',
    //   email: 'cynomys89@gmail.com',
    //   name: 'Kocsis Alt',
    //   created: new Date().getTime().toString()
    // };

    // db.users.insert(data);

    router.get('/users/profile', function(req, res) {
      db.users.findOne({ id: req.decoded.id }, function (err, data) {
        if (data) {
          dataDeleteKeys(data, ['_id', 'id', 'role', 'password']);

          return api.json(res, data);
        }

        return api.notFound(res, false);
      });
    });

    router.get('/users/:user_id', function(req, res) {
      if (req.decoded.role > 0 || req.params.user_id === req.decoded.id) {
        db.users.findOne({ id: req.params.user_id }, function (err, data) {
          if (data) {
            dataDeleteKeys(data, ['_id', 'id', 'role', 'created', 'password']);

            return api.json(res, data);
          }

          return api.notFound(res, false);
        });
      } else {
        return api.permission(res);
      }
    });
  }
}

export default UsersAPI;
