'use strict';

const sinon = require('sinon');

const resave = module.exports = sinon.stub();
resave.mockReturn = sinon.stub();
resave.returns(resave.mockReturn);
