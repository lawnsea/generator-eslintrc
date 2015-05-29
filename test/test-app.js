'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

suite('eslintrc:app', function () {
  suite('default behavior', function () {
    suiteSetup(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .on('end', done);
    });

    test('creates .eslintrc', function () {
      assert.file([
        './.eslintrc'
      ]);
    });
  });

  suite('--destination=foo/bar', function () {
    suiteSetup(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({
          destination: 'foo/bar'
        })
        .on('end', done);
    });

    test('creates foo/bar/.eslintrc', function () {
      assert.file([
        './foo/bar/.eslintrc'
      ]);
    });
  });
});
