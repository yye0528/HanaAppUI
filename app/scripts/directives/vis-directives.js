'use strict';

angular.module('visDirectives', [])
  .directive('visScatter', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/vis-scatter-template.html',
      scope: true //inherited scope
    };
  })
  .directive('visStockDT', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/vis-stock-dt-template.html',
      scope: true
    };
  })
  .directive('visStockRG', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/vis-stock-rg-template.html',
      scope: true
    };
  })
  .directive('visGrid', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/vis-grid-template.html',
      scope: true
    };
  })
  .directive('shapeLegend', ['$log',
    function($log) {
      return {
        restrict: 'E',
        scope: {},
        template: '<div class="shape-legend-container"></div>',
        link: function(scope, element, attr) {
          scope.legendData = [{
            x: 10,
            y: 5,
            shape: 'triangle-up',
            text: 'Price goes up'
          }, {
            x: 160,
            y: 5,
            shape: 'triangle-down',
            text: 'Price goes down'
          }, {
            x: 310,
            y: 5,
            shape: 'square',
            text: 'Price remains unchanged'
          }];
          scope.legend = d3.selectAll('.shape-legend-container').append('svg')
            .attr('width', 500)
            .attr('height', 40);
          scope.legend.selectAll('path')
            .data(scope.legendData)
            .enter().append('path')
            .style('stroke', '#333')
            .style('fill','#FFF')
            .attr('transform', function(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            })
            .attr('d', d3.svg.symbol().type(function(d) {
              return d.shape;
            }));

          scope.legend.selectAll('text')
            .data(scope.legendData)
            .enter().append('text')
            .attr('transform', function(d) {
              return 'translate(' + (d.x + 20) + ',' + (d.y + 5) + ')';
            })
          // .attr('text-anchor', 'middle')
          .text(function(d) {
            return d.text;
          });

        }
      };
    }
  ]);