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
  .directive('shapeLegend', ['$log',function($log) {
    return {
      restrict: 'E',
      scope:{},
      template: '<div class="shape-legend-container"></div>',
      link: function(scope,element,attr) {
        scope.legendData = [{
          x: 10,
          y: 5,
          shape: 'triangle-up',
          text: 'Correct prediction: Price goes up'
        }, {
          x: 310,
          y: 5,
          shape: 'triangle-down',
          text: 'Correct prediction: Price goes down'
        }, {
          x: 10,
          y: 25,
          shape: 'square',
          text: 'Correct prediction: Price remains unchange'
        }, {
          x: 310,
          y: 25,
          shape: 'diamond',
          text: 'Incorrect prediction'
        }];
        scope.legend = d3.selectAll('.shape-legend-container').append('svg')
          .attr('width',580)
          .attr('height',80);
          $log.log(angular.element('.shape-legend-container'));
        scope.legend.selectAll('path')
          .data(scope.legendData)
          .enter().append('path')
          .style('fill', '#FF2F00')
          .style('stroke', '#FF2F00')
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
  }]);