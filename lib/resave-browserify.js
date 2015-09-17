'use strict';

var browserify = require('browserify');
var extend = require('node.extend');
var resave = require('resave');
var isProduction = (process.env.NODE_ENV === 'production');

module.exports = resave(function (bundlePath, options, done) {
    var browserifyOptions = defaultBrowserifyOptions(options.browserify);
    browserify(bundlePath, browserifyOptions).bundle(done);
});

module.exports.defaults = {
    debug: !isProduction
};

function defaultBrowserifyOptions (options) {
    options = extend(true, {}, module.exports.defaults, options);
    return options;
}
