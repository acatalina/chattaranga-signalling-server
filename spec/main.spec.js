process.env.PORT = 9001;
const {expect} = require('chai');
const server = require('../server/server');
const request = require('supertest');

const ROOT = `localhost:${process.env.PORT}`;

before(() => {
  server;
});

after(() => {
  server.close();
});

describe('signalling server', () => {
  describe('GET /', () => {
    it('returns 200 and status OK', (done) => {
      request(ROOT)
        .get('/')
        .end((error, res) => {
          if (error) return done(error);

          expect(res.status).to.equal(200);
          expect(res.body.STATUS).to.equal('OK');
          done();
        });
    });
  });

  describe('GET /api', () => {
    it('returns 200 and PeerJS message', (done) => {
      request(ROOT)
        .get('/api')
        .end((error, res) => {
          if (error) return done(error);

          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal('PeerJS Server');
          done();
        });
    });
  });
});
