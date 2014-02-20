'use strict';

angular.module('visDirectives', [])
    .directive('visScatter', function() {
        return {
            restrict: 'EA',
            templateUrl: '/views/vis-scatter-template.html',
            scope: true
        };
    })
    .directive('visStockTrend', function() {
        return {
            restrict: 'EA',
            templateUrl: '/views/vis-stock-template.html',
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