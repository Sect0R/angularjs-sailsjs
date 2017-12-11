angular.module('myApp.directives', ['d3'])
  .directive('pieChart', ['d3', function(d3Service) {
    return {
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          // d3 is the raw d3 object
        });
      }}
  }]);
