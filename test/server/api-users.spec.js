var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

var server = 'http://localhost:8888';

describe('Users tests',function() {

  it('should be false, if user doesn\'t exists', function(done) {
    chai.request(server).get('/api/users/null').end(function(err, res) {
      var user = JSON.parse(res.text);

      expect(user.data).to.equal(false);

      done();
    });
  });

  it('should get user with id 1', function(done) {
    chai.request(server).get('/api/users/1').end(function(err, res) {
      var user = JSON.parse(res.text);

      expect(Object.keys(user.data).length).to.equal(5);

      done();
    });
  });

});
