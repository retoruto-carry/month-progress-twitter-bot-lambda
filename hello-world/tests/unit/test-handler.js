'use strict';

const app = require('../../app.js');
const chai = require('chai');
var assert = chai.assert;
var event, context;

describe('Function generateProgressBar', function () {
    it('0%', async () => {
        assert.deepEqual(await app.generateProgressBar(0),'░░░░░░░░░░░░░░░');
    });
    it('50%', async () => {
        assert.deepEqual(await app.generateProgressBar(0.5),'▓▓▓▓▓▓▓▓░░░░░░░');
    });
    it('100%', async () => {
        assert.deepEqual(await app.generateProgressBar(1),'▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓');
    });
});