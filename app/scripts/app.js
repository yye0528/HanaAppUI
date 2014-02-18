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
  'ui.bootstrap',
  'ngGrid'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: '/views/vis-select-tabs.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
