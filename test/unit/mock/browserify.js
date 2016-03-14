'use strict';

const sinon = require('sinon');

const browserify = module.exports = sinon.stub();
browserify.mockReturn = {
    bundle: sinon.stub()
};
browserify.returns(browserify.mockReturn);
