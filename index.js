"use strict";

const Status = require('./lib/status-codes');
let httpMessage = require('./lib/http-messages');
let statusInfo = require('./lib/status-info');

module.exports = function(options) {

    /**
     * Middleware for express. This method attaches all the helper
     * methods to the response object.
     **/
    return function(req, res, next) {

        /**
         * The request was OK.
         **/
        res.ok = function(data) {
            _generateResponse(res, Status.OK, data, options);
        };

        /**
         * A new resource was created.
         **/
        res.okNewResource = function(data) {
            _generateResponse(res, Status.OK_NEW_RESOURCE, data, options);
        };

        /**
         * Request was OK. No content returned.
         **/
        res.okNoContent = function() {
            _generateResponse(res, Status.OK_NO_CONTENT, null, options);
        };

        /**
         * Request was NOT ok. Or the content could not be served.
         **/
        res.badRequest = function(errors) {
            _generateResponse(res, Status.BAD_REQUEST, errors, options);
        };

        /**
         * Unauthorized access. (e.g. login fail or requesting without login)
         **/
        res.unauthorized = function() {
            _generateResponse(res, Status.UNATUHORIZED, null, options);
        };

        /**
         * Forbidden (e.g. request without correct privelegies)
         **/
        res.forbidden = function() {
            _generateResponse(res, Status.FORBIDDEN, null, options);
        };

        /**
         * Resource was not found. (error is not required)
         **/
        res.notFound = function() {
            _generateResponse(res, Status.NOT_FOUND, null, options);
        };

        /**
         * Request could not be processed (error in input).
         **/
        res.unprocessableEntity = function(errors) {
            _generateResponse(res, Status.UNPROCESSABLE_ENTITY, errors, options);
        };

        /**
         * Internal Server Error.
         **/
        res.internalServerError = function() {
            _generateResponse(res, Status.INTERNAL_SERVER_ERROR, null, options);
        };

        // All attachments done -> continue to next middleware
        next();
    };
};

/**
 * Helper function to generate a http response.
 * @param {Response} res - Express response object.
 * @param {Number} statusCode - Http Status code.
 * @param {JSON} data - to be in the response.
 **/
function _generateResponse(res, statusCode, data, options) {
    res.status(statusCode).json(_getDecoratedResponse(statusCode, data, options));
}

/**
 * Helper function to get a response that is decorated according
 * to the options.
 * 
 * @param {Number} statusCode - http status code to create response for.
 * @param {JSON} options - Options for the middleware.
 **/
function _getDecoratedResponse(statusCode, data, options) {
    let response = {};

    if (options) {
        if (options.showStatus)
            response.status = statusCode;
        if (options.showHttp)
            response.http = httpMessage(statusCode);
        if (options.showInfo)
            response.info = statusInfo(statusCode);
    }

    response.data = data;

    return response;
}
