# express-restful-helper 
[![NPM version](https://badge.fury.io/js/express-restful-helper.svg)](https://npmjs.org/package/express-restful-helper)
[![Build Status](https://travis-ci.org/Steeljuice/express-restful-helper.svg?branch=master)](https://travis-ci.org/Steeljuice/express-restful-helper)

> Express middleware to attach some common responses to the response object as helper-methods.
> This helper tries to enforce the best practices from [Thinking Mobile/Blog.](http://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/)

## Installation

```sh
$ npm install --save express-restful-helper
```

## Usage
The express-restful-helper middleware have to be attached before the routes are created.
It will attach methods to the response object from express. function(req, **res**, next).

```js
var express = require('express');
var app = express();
var expressRestfulHelper = require('express-restful-helper');

let options = {
    showInfo: true // Show helpful generic information about the response code.
    showHttp: true // Show the http status code as text (e.g. UNATHORIZED ACCESS)
    showStatus: true // Show the status code in the response
}
app.use(expressRestfulHelper(options));

app.get('/', (req, res, next) => {
    res.ok({
        message: 'successful request.'
    });
});

```

## Attached Methods
The below methods are attached to the response object. The basic express response is still available.

```js
    res.ok(data);                       // 200, OK: Request was successful.
    res.okNewResource(data);            // 201, CREATED: Request successfully created new resource.
    res.okNoContent();                  // 204, OK NO CONTENT: Request was successfull and no content returned.
    res.badRequest(errors);             // 400, BAD REQUEST: Bad Request (invalid input)
    res.unauthorized();                 // 401, UNAUTHORIZED ACCESS: Unathorized Access
    res.forbidden();                    // 403, FORBIDDEN: Forbidden access
    res.notFound();                     // 404, NOT FOUND: Not found
    res.unprocessableEntity(errors);    // 422, UNPROCESSABLE ENTITY: Data supplied not processable.
    res.internalServerError()           // 500, INTERNAL SERVER ERROR: Error occured on server.
```

## Respons Format
The options have three fields, showInfo, showHttp, showStatus that affects the response format (see below).
```js
{
    "http": "message",          // If option.showHttp = true
    "info": "message",          // If option.showInfo = true
    "status": "[status code]"   // If option.showStatus = true (this is ALWAYS available in the HEADERS)
    "data" : "[supplied data/errors]" // The payload when calling the attached method.
}
```

## Options
The options are used when using express.use() as a function parameter.
```js
let options = {
    showInfo: true // Show helpful generic information about the response code.
    showHttp: true // Show the http status code as text (e.g. UNATHORIZED ACCESS)
    showStatus: true // Show the status code in the response
}
app.use(expressRestfulHelper(options));
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, please create [an issue.](https://github.com/Steeljuice/express-restful-helper/issues)

## License

MIT © [Tommy Dronkers](https://github.com/Steeljuice)
