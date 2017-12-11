'use strict';

angular.module('myApp.controllers')
  .controller('MainCtrl', ['$scope', 'dataSet', '$timeout', function ($scope, dataSet, $timeout) {

    $scope.title = "MainCtrl";
    $scope.dataset = '';
    $scope.filtered = false;

    $scope.flushFilter = function () {
      $scope.filtered = false;
      $scope.dataset = '';

      dataSet.load().then(function (response) {
        if ( response && response.success ) {
          $scope.dataset = response;
        }
      }, function () {
        dataSet.loadFromUrl('/dataset.json').then(function (response) {
          $scope.dataset = JSON.stringify(response);
        });
      });
    };

    $scope.flushFilter();

    $scope.$watch('dataset', function (newV) {
      if ( newV ) {
        $scope.d3Data = JSON.parse(newV).establishments;
      }
    });

    $scope.saveDataset = function (needAlert) {

      dataSet.save($scope.dataset).then(function (response) {
          if ( response.success && needAlert ) {
            alert('Saved!');
          }
      });
    };

    $scope.loadDatasetFromFile = function () {
      $timeout(function () {
        document.querySelector('#uploader').click();
      });
    };

    $scope.d3OnClick = function () {
      $scope.filtered = true;
      $scope.$digest();
    };

    $scope.fileSelected = function(element){

        if ( element.files.length ) {
          dataSet.loadFromFile(element.files[0]).then(function (response) {
            $scope.dataset = response;

            dataSet.save($scope.dataset);

          })
        }
    };

  }]);
