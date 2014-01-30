'use strict';

angular.module('webApp')
	.controller('DemoCtrl', function($scope,$window){
		$scope.title = 'DemoCtrl';
		$scope.d3Data = [
			{name: 'Greg', score:98},
			{name: 'Ari', score:96},
			{name: 'Loser', score: 48}
		];
		$scope.d3OnClick = function(item){
			$window.alert(item.name);
		};
	})
	.controller('DemoCtrl2', function($scope){
		$scope.title = 'DemoCtrl2';
		$scope.d3Data = [
			{title: 'Greg', score:12},
			{title: 'Ari', score:43},
			{title: 'Loser', score: 87}
		];
	});
