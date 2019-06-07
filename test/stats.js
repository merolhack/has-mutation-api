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
describe('Validations', () => {
    beforeEach((done) => { //Before each test we empty the database
        Validation.deleteOne({ name: 'human' }, (err) => {});
        Validation.deleteOne({ name: 'mutant' }, (err) => {});
        done();
    });
    /*
      * Test the /GET route
      */
    describe('/GET Validations', () => {
        it('it should GET all the Validations', (done) => {
            chai.request(server)
                .get('/stats')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    done();
                });
        });
    });
});