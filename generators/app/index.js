'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');

var isAbsolute = path.isAbsolute ? path.isAbsolute : function (p) {
    // polyfill of path.isAbsolute for node < 0.12.x
    return path.resolve(p) === path.normalize(p);
  };

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('destination', {
      desc: 'directory to write .eslintrc in',
      type: 'String',
      defaults: './'
    });
  },

  initializing: function () {
    if (isAbsolute(this.options.destination)) {
      this.env.error('destination must be a relative path');
    }
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath(this.options.destination, '.eslintrc')
      );
    }
  }
});
