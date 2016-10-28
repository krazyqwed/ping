import Datastore from 'nedb';

class NotesAPI {
  constructor(app, router, db, api) {
    db.notes = new Datastore({ filename: './db/notes.db' });
    db.notes.loadDatabase();

    // let data = {
    //   id: '1',
    //   _user_id: '1',
    //   note: 'It\'s crowded. If you have the time try the shinjuku gyeon. But if you want to do a picnic, you can do it here and not in shinjuku gyeon.',
    //   location: {
    //     lat: '35.6991268',
    //     lng: '139.836788'
    //   },
    //   private: '0',
    //   created: new Date().getTime().toString()
    // };

    // db.notes.insert(data);

    router.get('/users/:user_id/notes', function(req, res) {
      if (req.decoded.role > 0 || req.params.user_id === req.decoded.id) {
        db.notes.find({ _user_id: req.params.user_id }, function (err, data) {
          if (data.length) {
            return api.json(res, data);
          }

          return api.notFound(res, false);
        });
      } else {
        return api.permission(res);
      }
    });

    router.get('/users/:user_id/notes/:note_id', function(req, res) {
      if (req.decoded.role > 0 || req.params.user_id === req.decoded.id) {
        db.notes.findOne({
          _user_id: req.params.user_id,
          id: req.params.note_id
        }, function (err, data) {
          if (data) {
            return api.json(res, data);
          }

          return api.notFound(res, false);
        });
      } else {
        return api.permission(res);
      }
    });

    router.put('/users/:user_id/notes', function(req, res) {
      db.notes.insert(req.body, function (err, data) {
        if (!err) {
          return api.json(res, true);
        }
      });
    });

    router.delete('/users/:user_id/notes/:note_id', function(req, res) {
      db.notes.remove({
        _user_id: req.params.user_id,
        id: req.params.note_id
      },
      {},
      function (err, numRemoved) {
        if (!err) {
          return api.json(res, true);
        }
      });
    });

  }
}

export default NotesAPI;
