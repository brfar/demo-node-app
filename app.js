const express = require('express');
/**
 * Node's native Path module provides utilities for working with file and directory paths. 
 * This module allows us to build the path to our `views` folder using its `join` method and `__dirname` 
 * (which returns the directory in which the currently executing script resides).
 */
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const app = express();

// Config to look for templates inside the views folder & to use Pug as a layout engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * To retrieve whatever data the user has submitted via the form, we’ll need body-parser, 
 * which will make the form data available on the request body.
 * There are various ways to format the data you POST to the server, using body-parser's `urlencoded` method 
 * allows us to handle data sent as `application/x-www-form-urlencoded`.
 */
app.use(bodyParser.urlencoded({ extended: true }));

// whenever it receives a request from forward slash anything, it should use the `routes` file.
app.use('/', router);

// we're exporting our app variable so that it can be imported and used in other files.
module.exports = app;
