'use strict';

angular.module('controllers', ['dataManager', 'underscore', 'ngDropdowns'])

.controller('tabsCtrl', ['$scope', '$log',
    function($scope) {
        $scope.tabs = [{
            title: 'Table View',
            imgUrl: '/images/icons/grid-26.png',
            contentUrl: '/views/tab-content-grid.html',
            active: true
        }, {
            title: 'Scatter Plot',
            imgUrl: '/images/icons/scatter_plot-25.png',
            contentUrl: '/views/tab-content-scatter.html',
            active: false
        }, {
            title: 'Stock Trend',
            imgUrl: '/images/icons/scatter_plot-25.png',
            contentUrl: '/views/tab-content-stock-trend.html',
            active: false
        }];
    }
])

.controller('scatterCtrl', ['$scope', '$log', '_', 'dataLoader', 'dataStore', 'dataTransformer',
    function($scope, $log, _, dataLoader, dataStore, dataTransformer) {
        $scope.showPlaceholder = true;
        $scope.showError = false;
        //prepare the data
        var rawData = dataLoader.get({
                data: 'testdata'
            }, function(rawData) {
                //callback function from the query

                $scope.columns = rawData.input.columns;
                $scope.attrOptions = [];
                $scope.attrForX = {
                    attrName: 'Please select',
                    value: false
                };
                $scope.attrForY = {
                    attrName: 'Please select',
                    value: false
                };

                _.each($scope.columns, function(element) {
                    $scope.attrOptions.push({
                        attrName: element,
                        value: element
                    });
                });
                $scope.showPlaceholder = false;
            },
            function(reason) {
                $scope.showError = true;
                $log.log('data loading failed. reason: ' + reason);
            });

        //update chart data when user change the selection
        $scope.axisChange = function(axisName) {
            if ($scope.attrForX.value && $scope.attrForY.value) {
                // $scope.chart=null;
                $scope.data = dataTransformer.LRTonvd3Scatter(rawData, $scope.attrForX.value, $scope.attrForY.value, '');
            }
        };

        //for stock prediction only
        $scope.getShape = function() {
            return function(d) {
                return d.shape;
            };
        };

        //configure the chart
        $scope.axistickformatFunction = function() {
            return d3.format('.1f');
        };

        $scope.callbackFunction = function() {
            return function(chart) {
                $scope.chart = chart;
            };
        };


    }
])
    .controller('stockCtrl', ['$scope', '$log', '_', 'dataLoader', 'dataStore', 'dataTransformer',
        function($scope, $log, _, dataLoader, dataStore, dataTransformer) {
            $scope.showPlaceholder = true;
            $scope.showError = false;

            //prepare the data
            var rawData = dataLoader.get({
                    data: 'PAL.stock_1d'
                }, function(rawData) {
                    //callback function from the query
                    $scope.columns = rawData.columns;
                    $scope.data = dataTransformer.DTToStockPredition(rawData, 'DATE', 'STOCK_CLOSE_PRICE', 'predicted');

                    $scope.showPlaceholder = false;
                },
                function(reason) {
                    //data loading failed
                    $scope.showError = true;
                    $log.log('data loading failed. reason: ' + reason);
                });

            //for stock prediction only
            $scope.getShape = function() {
                return function(d) {
                    return d.shape;
                };
            };

            //configure the chart
            $scope.dateAxistickformatFunction = function() {
                return function(d) {
                    return d3.time.format('%m/%d/%Y')(new Date(d));
                }
            };

            $scope.priceAxistickformatFunction = function() {
                return d3.format('.1f');
            };

            $scope.tooltipContentFunction = function(){
                return function(key, x){
                    //$log.log(key);
                    return '<strong> ho! </strong>'; 
                }
            }


            $scope.callbackFunction = function() {
                return function(chart) {
                    // $log.log(chart);
                };
            };


        }
    ])
    .controller('gridCtrl', ['$scope', '$log', 'dataLoader', 'dataStore', 'dataTransformer',
        function($scope, $log, dataLoader, dataStore, dataTransformer) {
            $scope.showPlaceholder = true;
            $scope.showError = false;

            // initiate grid option. Skipping initiation will invoke compiling error!
            $scope.gridData = [];
            $scope.columnDefs = [];
            $scope.gridOptions = {
                data: 'gridData',
                enablePinning: true,
                // showGroupPanel: true,         ---> buggy in 2.0.7, will be fixed in 2.0.8
                enableColumnResize: true,
                columnDefs: 'columnDefs'
            };

            var columns = [];
            var rawData = dataLoader.get({
                    data: 'testdata'
                }, function(rawData) {
                    $scope.columns = rawData.input.columns;
                    _.each($scope.columns, function(element) {
                        var column = {
                            field: element
                        };
                        columns.push(column);
                    });
                    //append the $group to indicate input data or predicted data
                    columns.push({
                        field: '$group',
                        displayName: 'Group'
                    });
                    $scope.columnDefs = columns;
                    $scope.gridData = dataTransformer.LRToGrid(rawData);

                    $scope.showPlaceholder = false;
                },
                function(reason) {
                    $scope.showError = true;
                    $log.log("data loading failed. reason: " + reason);
                }); //rawData callback

        }
    ]);