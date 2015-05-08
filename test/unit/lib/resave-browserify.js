/* jshint maxstatements: false, maxlen: false */
/* global beforeEach, describe, it */
'use strict';

var assert = require('proclaim');
var mockery = require('mockery');
var sinon = require('sinon');

describe('lib/resave-browserify', function () {
    var browserify, extend, resave, resaveBrowserify;

    beforeEach(function () {

        extend = sinon.stub();
        mockery.registerMock('node.extend', extend);

        browserify = require('../mock/browserify');
        mockery.registerMock('browserify', browserify);

        resave = require('../mock/resave');
        mockery.registerMock('resave', resave);

        resaveBrowserify = require('../../../lib/resave-browserify');

    });

    it('should create a resave middleware', function () {
        assert.calledOnce(resave);
        assert.isFunction(resave.firstCall.args[0]);
    });

    it('should export the resave middleware', function () {
        assert.strictEqual(resaveBrowserify, resave.mockReturn);
    });

    it('should have a `defaults` property', function () {
        assert.isObject(resaveBrowserify.defaults);
    });

    describe('.defaults', function () {
        var defaults;

        beforeEach(function () {
            defaults = resaveBrowserify.defaults;
        });

        it('should have a `debug` property', function () {
            assert.isTrue(defaults.debug);
        });

    });

    describe('resave `creatBundle` function', function () {
        var browserifyOptions, bundlePath, creatBundle, done, options;

        beforeEach(function () {
            bundlePath = 'foo';
            options = {
                browserify: {
                    foo: 'bar'
                }
            };
            done = sinon.spy();
            browserifyOptions = {
                foo: 'bar'
            };
            extend.returns(browserifyOptions);
            creatBundle = resave.firstCall.args[0];
            creatBundle(bundlePath, options, done);
        });

        it('should default the browserify options', function () {
            assert.calledOnce(extend);
            assert.isTrue(extend.firstCall.args[0]);
            assert.isObject(extend.firstCall.args[1]);
            assert.strictEqual(extend.firstCall.args[2], resaveBrowserify.defaults);
            assert.strictEqual(extend.firstCall.args[3], options.browserify);
        });

        it('should create a browserify bundle with the expected options', function () {
            assert.calledOnce(browserify);
            assert.calledWith(browserify, bundlePath, browserifyOptions);
        });

        it('should callback with the browserify bundle', function () {
            assert.calledOnce(browserify.mockReturn.bundle);
            assert.calledWith(browserify.mockReturn.bundle, done);
        });

    });

});
