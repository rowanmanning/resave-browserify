'use strict';

var browserify = require('browserify');
var extend = require('node.extend');
var resave = require('resave');

module.exports = resave(function (bundlePath, options, done) {
    var browserifyOptions = defaultBrowserifyOptions(options.browserify);
    browserify(bundlePath, browserifyOptions).bundle(done);
});

module.exports.defaults = {
    debug: true
};

function defaultBrowserifyOptions (options) {
    options = extend(true, {}, module.exports.defaults, options);
    return options;
}
