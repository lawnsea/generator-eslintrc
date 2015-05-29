'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

suite('eslintrc:app', function () {
  suiteSetup(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

  test('creates .eslintrc', function () {
    assert.file([
      '.eslintrc'
    ]);
  });
});
