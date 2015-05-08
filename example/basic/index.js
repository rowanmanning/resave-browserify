'use strict';

var connect = require('connect');
var resaveBrowserify = require('../..');
var serveStatic = require('serve-static');

// Remove the existing example.js if there is one (just for the example!)
try {
    fs.unlinkSync(__dirname + '/public/example.js');
} catch (error) {}

// Create a connect application
var app = connect();

// Use the serve-static middleware. This will serve the created
// file after the first compile
app.use(serveStatic(__dirname + '/public'));

// Use the middleware
app.use(resaveBrowserify({
    basePath: __dirname + '/source',
    bundles: {
        '/example.js': 'example.js'
    },
    log: {
        error: console.log.bind(console),
        info: console.log.bind(console)
    },
    savePath: __dirname + '/public'
}));

// Use a dummy error handler
app.use(function (error, request, response, next) {
    // jshint unused: false
    response.writeHead(500);
    response.end('500 Server Error:\n\n' + error.stack);
});

// Listen on a port
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Application running on port %s', port);
    console.log('Visit http://localhost:%s/ in your browser', port);
});
