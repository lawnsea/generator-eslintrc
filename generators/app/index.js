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

    this.option('source', {
      desc: 'source template for .eslintrc',
      type: 'String',
      defaults: this.templatePath('eslintrc')
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
        path.resolve(this.options.source),
        this.destinationPath(this.options.destination, '.eslintrc')
      );
    }
  }
});
