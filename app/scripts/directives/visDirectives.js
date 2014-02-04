'use strict';

angular.module('visDirectives',[])
	.directive("visScatter",function(){
		return {
			restrict: 'EA',
			templateUrl: '/views/vis-scatter-template.html',
			scope:true
		};
	});