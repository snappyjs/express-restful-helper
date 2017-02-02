"use strict";

const Status = require('./status-codes');

/**
 * Returns a helpful message as to why a specific response code is made.
 * @param {Number} statusCode - The http status code.
 * @returns {String} Helpful generic message for a status code.
 **/
module.exports = function(statusCode) {
    switch (statusCode) {
        case Status.OK:
            return 'Request was successful.';
        case Status.OK_NEW_RESOURCE:
            return 'Resource was successfully created.';
        case Status.OK_NO_CONTENT:
            return 'Request was successfull and there is no content to be returned.';
        case Status.BAD_REQUEST:
            return 'The request was invalid or could not be served.';
        case Status.UNATUHORIZED:
            return 'Resource requires authentication.';
        case Status.FORBIDDEN:
            return 'Resource requires a different access.';
        case Status.NOT_FOUND:
            return 'No resource could be found.';
        case Status.UNPROCESSABLE_ENTITY:
            return 'Could not process entity. (e.g. invalid fields)';
        case Status.INTERNAL_SERVER_ERROR:
            return 'Error occured on server, please try again later.'
    }
}
