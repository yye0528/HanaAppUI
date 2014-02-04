'use strict';

angular.module('webApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'underscore',
  'dataManager',
  'controllers',
  'visDirectives',
  'nvd3ChartDirectives',
  'ngDropdowns',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/vis', {
        templateUrl: '/views/vis-scatter-template.html'
      })
      .when("/", {
        templateUrl: '/views/vis-select-tabs.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
