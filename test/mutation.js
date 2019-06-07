// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Validation = require('../src/models/validation');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index');
const should = chai.should();


chai.use(chaiHttp);
// Our parent block
describe('Has Mutation', () => {
    /*
      * Test the /POST route
      */
    describe('/POST hasMutation', () => {
        it('it should POST a new hasMutation', (done) => {
            chai.request(server)
                .post('/mutation')
                .send({dna: ["ATGCGA","CAGTGC","TTGTGT","AGAAGG","CCGCTA","TCACTG"]})
                .end((err, res) => {
                    res.should.have.status(403);
                    res.body.should.be.a('Object');
                    done();
                });
        });
    });
});
