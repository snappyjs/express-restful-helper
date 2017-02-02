"use strict";

/**
 * Status codes that are available as default functions.
 **/
module.exports = {
    OK: 200, // OK.
    OK_NEW_RESOURCE: 201, // Created a new resource successfully.
    OK_NO_CONTENT: 204, // Success, and not content in response.
    BAD_REQUEST: 400, // The request was invalid or cannot be served.
    UNATUHORIZED: 401, // Request requires authentication
    FORBIDDEN: 403, // Access not allowed
    NOT_FOUND: 404, // Resource could not be found
    UNPROCESSABLE_ENTITY: 422, // Invalid input in payload
    INTERNAL_SERVER_ERROR: 500, // Serer error
}
