var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

var server = 'http://localhost:8888';

describe('Notes tests',function() {
  it('should be false, if there\'s no notes', function(done) {
    chai.request(server).get('/api/users/test/notes').end(function(err, res) {
      var notes = JSON.parse(res.text);

      expect(notes.__status).to.equal('404');

      done();
    });
  });

  it('should insert note with id "test" to user', function(done) {
    chai.request(server).put('/api/users/test/notes')
    .send({
      id: 'test',
      _user_id: 'test',
      note: 'It\'s crowded. If you have the time try the shinjuku gyeon. But if you want to do a picnic, you can do it here and not in shinjuku gyeon.',
      location: {
        lat: '35.6991268',
        lng: '139.836788'
      },
      private: '0',
      created: new Date().getTime().toString()
    })
    .end(function(err, res) {
      var note = JSON.parse(res.text);

      expect(note.__status).to.equal('200');

      done();
    });
  });

  it('should get all notes of user', function(done) {
    chai.request(server).get('/api/users/test/notes').end(function(err, res) {
      var notes = JSON.parse(res.text);

      expect(notes.data.length).to.equal(1);

      done();
    });
  });

  it('should get note with id "test" of user', function(done) {
    chai.request(server).get('/api/users/test/notes/test').end(function(err, res) {
      var note = JSON.parse(res.text);

      expect(typeof note.data).to.equal('object');
      expect(Object.keys(note.data).length).to.equal(7);

      done();
    });
  });

  it('should delete note with id "test" of user', function(done) {
    chai.request(server).delete('/api/users/test/notes/test').end(function(err, res) {
      var note = JSON.parse(res.text);

      expect(note.__status).to.equal('200');

      done();
    });
  });

});
