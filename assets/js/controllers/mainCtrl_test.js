'use strict';

describe('myApp.controllers module', function() {

  beforeEach(module('myApp.controllers'));
  beforeEach(module('myApp.services'));

  var $rootScope, dataSet;

  beforeEach(inject(function(_$rootScope_, _dataSet_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $rootScope = _$rootScope_;
    dataSet = _dataSet_;
  }));

  describe('main controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var scope = $rootScope.$new();

      var mainCtrl = $controller('MainCtrl', {$scope: scope, dataSet: dataSet});
      expect(mainCtrl).toBeDefined();
    }));

  });
});
