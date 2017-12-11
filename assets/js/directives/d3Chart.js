'use strict';

angular.module('myApp.directives')
  .directive('d3Chart', ['d3Service', 'dataSet', function (d3Service, dataSet) {
    return {
      restrict: 'EA',
      scope: {
        data: "=",
        label: "@",
        onClick: "&"
      },
      link: function (scope, iElement, iAttrs) {

        // when d3js is loaded
        d3Service.d3().then(function (d3) {

          // set default params
          var width = 500,
            height = 500,
            pieWidth = 80,
            svg = d3.select(iElement[0]).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),

            regionColors = d3.scale.category20(),
            contractColors = d3.scale.category20b(),
            establishmentColors = d3.scale.category20c();


          // main function for draw pie chart
          // data - array with data, index - pie chart position, color - colorset
          function drawPieChart(_data, index, color) {

            // draw pie
            var pie = d3.layout.pie()
              .sort(null)
              .value(function (d) {
                return d.value;
              });

            // set radius for arc
            var arc = d3.svg.arc()
              .outerRadius((index + 1) * pieWidth - 1)
              .innerRadius(index * pieWidth);

            // set data to all arc
            var g = svg.selectAll(".arc" + index)
              .data(pie(_data))
              .enter()
              .append("g")
              .attr("class", "arc arc" + index)
              .on("click", function (d, i) {
                // filter pie chart by current arc data and render
                scope.onClick(d);
                filterPieChart(d);
              });

            // fill path
            g.append("path").attr("d", arc)
              .style("fill", function (d) {
                return color(d.data.label);
              });

            // add text with label
            g.append("text").attr("transform", function (d) {
              return "translate(" + arc.centroid(d) + ")";
            })
              .attr("dy", ".35em")
              .style("text-anchor", "middle")
              .text(function (d) {
                return d.data.label;
              });
          }

          // filter pie chart by current arc data and render
          function filterPieChart(itemFilter) {
            scope.render(scope.data, itemFilter.data);
          }

          // render function - show pie charts
          scope.render = function (data, filterBy) {
            svg.selectAll("*").remove();

            data = dataSet.fetchData(data, filterBy);

            drawPieChart(data.regions, 0, regionColors);
            drawPieChart(data.types, 1, establishmentColors);
            drawPieChart(data.contracts, 2, contractColors);
          };

          // render when data is changed
          scope.$watch('data', function (newV, oldV) {
            if (newV) {
              scope.render(newV);
            }
          });

        });

      }
    };
  }]);
