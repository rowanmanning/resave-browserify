/* jshint maxstatements: false, maxlen: false */
/* global beforeEach, describe, it */
'use strict';

var assert = require('proclaim');

describe('lib/resave-browserify', function () {
    var resaveBrowserify;

    beforeEach(function () {
        resaveBrowserify = require('../../../lib/resave-browserify');
    });

    it('should be a function', function () {
        assert.isFunction(resaveBrowserify);
    });

});
