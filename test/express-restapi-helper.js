"use strict";

let express = require('express');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

chai.use(chaiHttp);

let expressRestAPIHelper = require('../index.js');


// Contains all the functions attached to the express response object.
const helpers = [
    'ok',
    'okNewResource',
    'okNoContent',
    'badRequest',
    'unauthorized',
    'forbidden',
    'notFound',
    'unprocessableEntity',
    'internalServerError'
];

describe('Express-RestAPI-Helper', () => {

    /**
     * Makes a request and checks if all the restapi-helper functions are attached
     * to the response object.
     **/
    it('Should attach all helper methods to the response object.', done => {
        let server = express();

        server.use(expressRestAPIHelper());
        let route = '/test/methods';

        // Assertion on the response object.
        server.get(route, (req, res) => {
            assert.isNotNull(res, 'Response object is NULL.');

            helpers.forEach(name => {
                assert.isFunction(res[name], `${name} is NOT attached to the response object.`);
            });

            // Test done
            done();
        });

        chai.request(server)
            .get(route)
            .end();
    });


    /**
     * Test to make sure that the response body shows all options when enabled.
     **/
    it('Should show all response options.', done => {
        let server = express();

        let route = '/test/options';

        server.use(expressRestAPIHelper({
            showStatus: true,
            showHttp: true,
            showInfo: true
        }));


        server.get(route, (req, res) => {
            res.ok({
                key: 'success.'
            });

        });

        chai.request(server)
            .get(route)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('http');
                res.body.should.have.property('status');
                res.body.should.have.property('info');
                res.body.should.have.property('data');

                done();
            });
    });

    /**
     * Test to make sure that only showHttp option is shown.
     **/
    it('Should not show any response options.', done => {
        let server = express();
        let route = '/test/no-options';


        server.use(expressRestAPIHelper({
            showHttp: true
        }));

        server.get(route, (err, res) => {
            res.unprocessableEntity({
                errors: {
                    field: 'key'
                }
            });
        });

        chai.request(server)
            .get(route)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('http');
                res.body.should.not.have.property('info');
                res.body.should.not.have.property('status');
                res.body.should.have.property('data');

                done();
            });


    });




});
