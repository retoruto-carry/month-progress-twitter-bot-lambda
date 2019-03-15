'use strict';

const app = require('../../app.js');
const chai = require('chai');
var assert = chai.assert;
var event, context;

describe('Tests index', function () {
    // not working 書き方が分からない
    it('generateProgressBar_0%', async () => {
        assert.deepEqual(await app.generateProgressBar(0),'░░░░░░░░░░░░░░░');
    });
});