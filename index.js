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
        res.okNoContent = function(data) {
            _generateResponse(res, Status.OK_NO_CONTENT, data, options);
        };

        /**
         * Request was NOT ok. Or the content could not be served.
         **/
        res.badRequest = function(data) {
            _generateResponse(res, Status.BAD_REQUEST, data, options);
        };

        /**
         * Unauthorized access. (e.g. login fail or requesting without login)
         **/
        res.unauthorized = function(data) {
            _generateResponse(res, Status.UNATUHORIZED, data, options);
        };

        /**
         * Forbidden (e.g. request without correct privelegies)
         **/
        res.forbidden = function(data) {
            _generateResponse(res, Status.FORBIDDEN, data, options);
        };

        /**
         * Resource was not found. (error is not required)
         **/
        res.notFound = function(data) {
            _generateResponse(res, Status.NOT_FOUND, data, options);
        };

        /**
         * Request could not be processed (error in input).
         **/
        res.unprocessableEntity = function(data) {
            _generateResponse(res, Status.UNPROCESSABLE_ENTITY, data, options);
        };

        /**
         * Internal Server Error.
         **/
        res.internalServerError = function(data) {
            _generateResponse(res, Status.INTERNAL_SERVER_ERROR, data, options);
        };

        /**
         * Generate a message with custom statusCode and data.
         **/
        res.api = function(statusCode, data, infoMessage, httpMessage) {
            let responseObj = {};

            if (options) {
                if (options.showStatus)
                    responseObj.status = statusCode;
                if (options.showHttp)
                    responseObj.http = httpMessage;
                if (options.showInfo)
                    responseObj.info = infoMessage;
            }
            responseObj.data = data;

            res.status(statusCode).json(responseObj);
        }

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
    res.status(statusCode).json(response);
}
