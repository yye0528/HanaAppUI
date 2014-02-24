'use strict';

angular.module('visDirectives', [])
  .directive('visScatter', function() {
    return {
      restrict: 'EA',
      templateUrl: '/views/vis-scatter-template.html',
      scope: true
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
  });