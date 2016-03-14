// jshint maxstatements: false
// jscs:disable disallowMultipleVarDecl, maximumLineLength
'use strict';

const assert = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

describe('lib/resave-browserify', () => {
    let browserify;
    let extend;
    let resave;
    let resaveBrowserify;

    beforeEach(() => {

        extend = sinon.stub();
        mockery.registerMock('node.extend', extend);

        browserify = require('../mock/browserify');
        mockery.registerMock('browserify', browserify);

        resave = require('../mock/resave');
        mockery.registerMock('resave', resave);

        resaveBrowserify = require('../../../lib/resave-browserify');

    });

    it('should create a resave middleware', () => {
        assert.calledOnce(resave);
        assert.isFunction(resave.firstCall.args[0]);
    });

    it('should export the resave middleware', () => {
        assert.strictEqual(resaveBrowserify, resave.mockReturn);
    });

    it('should have a `defaults` property', () => {
        assert.isObject(resaveBrowserify.defaults);
    });

    describe('.defaults', () => {
        let defaults;

        beforeEach(() => {
            defaults = resaveBrowserify.defaults;
        });

        it('should have a `debug` property', () => {
            if (process.env.NODE_ENV === 'production') {
                assert.isFalse(defaults.debug);
            }
            else {
                assert.isTrue(defaults.debug);
            }
        });

    });

    describe('resave `creatBundle` function', () => {
        let browserifyOptions;
        let bundlePath;
        let creatBundle;
        let done;
        let options;

        beforeEach(() => {
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

        it('should default the browserify options', () => {
            assert.calledOnce(extend);
            assert.isTrue(extend.firstCall.args[0]);
            assert.isObject(extend.firstCall.args[1]);
            assert.strictEqual(extend.firstCall.args[2], resaveBrowserify.defaults);
            assert.strictEqual(extend.firstCall.args[3], options.browserify);
        });

        it('should create a browserify bundle with the expected options', () => {
            assert.calledOnce(browserify);
            assert.calledWith(browserify, bundlePath, browserifyOptions);
        });

        it('should callback with the browserify bundle', () => {
            assert.calledOnce(browserify.mockReturn.bundle);
            assert.calledWith(browserify.mockReturn.bundle, done);
        });

    });

});
