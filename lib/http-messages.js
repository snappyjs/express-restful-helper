"use strict";

const Status = require('./status-codes');

/**
 * Helper function to get the status message from status.
 * @param {Number} statusCode - HTTP status-code.
 * @returns {String} - http Response text.
 **/
module.exports = function(statusCode) {
    switch (statusCode) {
        case Status.OK:
            return 'OK';
        case Status.OK_NEW_RESOURCE:
            return 'CREATED';
        case Status.OK_NO_CONTENT:
            return 'NO CONTENT';
        case Status.BAD_REQUEST:
            return 'BAD REQUEST';
        case Status.UNATUHORIZED:
            return 'UNATUHORIZED ACCESS';
        case Status.FORBIDDEN:
            return 'FORBIDDEN';
        case Status.NOT_FOUND:
            return 'RESOURCE NOT FOUND';
        case Status.UNPROCESSABLE_ENTITY:
            return 'UNPROCESSABLE ENTITY';
        case Status.INTERNAL_SERVER_ERROR:
            return 'INTERNAL SERVER ERROR'
    }
}
