'use strict';

var sinon = require('sinon');

var browserify = module.exports = sinon.stub();
browserify.mockReturn = {
    bundle: sinon.stub()
};
browserify.returns(browserify.mockReturn);
