'use strict';

const browserify = require('browserify');
const extend = require('node.extend');
const resave = require('resave');
const isProduction = (process.env.NODE_ENV === 'production');

module.exports = resave((bundlePath, options, done) => {
    const browserifyOptions = defaultBrowserifyOptions(options.browserify);
    browserify(bundlePath, browserifyOptions).bundle(done);
});

module.exports.defaults = {
    debug: !isProduction
};

function defaultBrowserifyOptions (options) {
    return extend(true, {}, module.exports.defaults, options);
}
