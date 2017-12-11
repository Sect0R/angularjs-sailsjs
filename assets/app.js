'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngMaterial',
  'd3',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

angular.module('myApp.services', []);
angular.module('myApp.controllers', []);
angular.module('myApp.directives', ['d3']);


