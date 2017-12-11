//jshint strict: false
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './www',

    // list of files / patterns to load in the browser
    files: [
      'js/dependencies/angular.js',
      'js/dependencies/angular-animate.js',
      'js/dependencies/angular-aria.js',
      'js/dependencies/angular-messages.js',
      'js/dependencies/angular-material.js',
      'js/dependencies/angular-mocks.js',

      'app.js',

      'js/controllers/mainCtrl.js',
      'js/directives/*.js',
      'js/services/*.js',

      'js/**/*_test.js',
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    autoWatch: true,
    singleRun: true,

    browsers: ['PhantomJS']

  });
};
