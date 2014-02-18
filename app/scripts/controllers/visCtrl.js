'use strict';

angular.module('controllers',['dataManager','underscore','ngDropdowns'])

	.controller('tabsCtrl', ['$scope','$log', function ($scope,$log) {
  $scope.tabs=[
  	{title:'Table View',imgUrl:'/images/icons/grid-26.png',contentUrl:'/views/tab-content-grid.html',active:true},
  	{title:'Scatter Plot',imgUrl:'/images/icons/scatter_plot-25.png',contentUrl:'/views/tab-content-scatter.html',active:false}
  ];
	}])

	.controller('scatterCtrl', ['$scope','$log','_','dataLoader','dataStore','dataTransformer',
		function($scope,$log,_,dataLoader,dataStore,dataTransformer){
			$scope.showPlaceholder=true;
			$scope.showError=false;
			//prepare the data
			var rawData=dataLoader.get({data:'testdata'},function(rawData){
				//callback function from the query
				$log.log("data loading successfull. Data: "+rawData);

				$scope.columns=rawData.input.columns;

				$scope.attrOptions=[];
				$scope.attrForX={attrName: "Please select",value:false};
				$scope.attrForY={attrName: "Please select",value:false};

				_.each($scope.columns,function(element){
					$scope.attrOptions.push({
						attrName:element,
						value:element
					});
				});

				$scope.showPlaceholder=false;


			},
			function(reason){
				$scope.showError=true;
				$log.log("data loading failed. reason: "+reason);
			});

			//update chart data when user change the selection
			$scope.axisChange=function(axisName){
				if($scope.attrForX.value && $scope.attrForY.value){
					$scope.data =	dataTransformer.LRTonvd3Scatter(rawData,$scope.attrForX.value,$scope.attrForY.value,'');
				}
			}

			//configure the chart
			$scope.axistickformatFunction=function(){
				return d3.format(".1f");
			}

			$scope.getShapeCross = function(){
					return function(d){
							return 'circle';
					}
			}

	}])
	.controller('gridCtrl', ['$scope','$log','dataLoader','dataStore','dataTransformer', 
		function ($scope,$log,dataLoader,dataStore,dataTransformer) {
			$scope.showPlaceholder=true;
			$scope.showError=false;

			// initiate grid option. Skipping initiation will invoke compiling error!
			$scope.gridData = [];
			$scope.columnDefs=[];
			$scope.gridOptions = { 
				data: 'gridData',
		    enablePinning: true,
		    // showGroupPanel: true,     ---> buggy in 2.0.7, will be fixed in 2.0.8
		    enableColumnResize:true, 
		    columnDefs:'columnDefs'
			};
	  	
	  	var columns=[];
			var rawData=dataLoader.get({data:'testdata'},function(rawData){
				$scope.columns=rawData.input.columns;
			  _.each($scope.columns,function(element){
			  	var column={field:element};
			  	columns.push(column);
				 });
				 //append the $group to indicate input data or predicted data
				 columns.push({field:'$group', displayName:'Group'});			  
				 $scope.columnDefs=columns;
				 $scope.gridData=dataTransformer.LRToGrid(rawData);

			  $scope.showPlaceholder=false;
			},
				function(reason){
					$scope.showError=true;
					$log.log("data loading failed. reason: "+reason);
			});//rawData callback

	}]);

