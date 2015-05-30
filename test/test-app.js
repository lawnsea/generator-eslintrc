'use strict';

var assert = require('yeoman-generator').assert;
var fs = require('fs');
var helpers = require('yeoman-generator').test;
var path = require('path');
var appDir = path.join(__dirname, '../generators/app');

suite('eslintrc:app', function () {
  suite('default behavior', function () {
    suiteSetup(function (done) {
      helpers.run(appDir)
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
      helpers.run(appDir)
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

  suite('--source=foo/bar', function () {
    var sourceText = '{ "rules": {} }';

    suiteSetup(function (done) {
      helpers.run(appDir)
        .inDir(path.join(appDir, '../../tmp'), function (dir) {
          fs.mkdirSync('foo');
          fs.writeFileSync('foo/bar', sourceText);
        })
        .withOptions({
          source: 'foo/bar'
        })
        .on('end', done);
    });

    test('writes foo/bar as .eslintrc', function () {
      assert.file([
        './.eslintrc'
      ]);

      assert.fileContent('./.eslintrc', sourceText);
    });
  });
});
