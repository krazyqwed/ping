var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

var server = 'http://localhost:8888';

describe('Test api call',function() {

  it('should return with status 200',function(done) {
    chai.request(server).get('/api').end(function(err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);

      done();
    });
  });

  it('should return with status 403 when no token provided',function(done) {
    chai.request(server).get('/api/token_test').end(function(err, res) {
      expect(res).to.have.status(403);

      done();
    });
  });

  it('should return with status 200 when token provided',function(done) {
    chai.request(server).get('/api/token_test?').end(function(err, res) {
      expect(res).to.have.status(200);

      done();
    });
  });

});
