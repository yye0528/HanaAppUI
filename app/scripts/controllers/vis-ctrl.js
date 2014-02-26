'use strict';

angular.module('controllers', ['dataManager', 'underscore', 'ngDropdowns'])

.controller('tabsCtrl', ['$scope', '$log',
  function($scope) {
    $scope.tabs = [{
      title: 'Input data',
      imgUrl: '/images/icons/grid-26.png',
      contentUrl: '/views/tab-content-grid.html',
      active: true
    }, {
      title: 'Overview',
      imgUrl: '/images/icons/scatter_plot-25.png',
      contentUrl: '/views/tab-content-scatter.html',
      active: false
    }, {
      title: 'Trend Prediction-Decision Tree',
      imgUrl: '/images/icons/scatter_plot-25.png',
      contentUrl: '/views/tab-content-stock-dt.html',
      active: false
    }, {
      title: 'Trend Prediction-Logistic Regression',
      imgUrl: '/images/icons/scatter_plot-25.png',
      contentUrl: '/views/tab-content-stock-rg.html',
      active: false
    }];
  }
])

.controller('scatterCtrl', ['$scope', '$log', '_', 'dataLoader', 'dataStore', 'dataTransformer', '$q',
  function($scope, $log, _, dataLoader, dataStore, dataTransformer, $q) {
    $scope.showPlaceholder = true;
    $scope.showError = false;
    $scope.$watch(function() {
      return (!$scope.showPlaceholder && !$scope.showError);
    }, function(value) {
      $scope.showContent = value;
    });

    //prepare the data
    var rawData = {};
    $q.all([dataLoader.get({
      data: 'input.json'
    }).$promise, dataLoader.get({
      data: 'predicted_1d.json'
    }).$promise]).then(function(result) {
        //callback function from the query
        rawData.input = result[0];
        rawData.predicted = result[1];
        $scope.columns = dataTransformer.getNumericColomns(rawData.input.columns, rawData.input.values);
        $scope.attrOptions = [];
        _.each($scope.columns, function(element) {
          $scope.attrOptions.push({
            attrName: element,
            value: element
          });
        });
        $scope.attrOptions.push({
          attrName: 'DATE',
          value: 'DATE'
        });

        $scope.attrForX = {
          attrName: 'DATE',
          value: 'DATE'
        };
        $scope.attrForY = {
          attrName: 'STOCK_CLOSE_PRICE',
          value: 'STOCK_CLOSE_PRICE'
        };
        $scope.axisChange();

        $scope.showPlaceholder = false;
      },
      function(reason) {
        //data loading failed
        $scope.showPlaceholder = false;
        $scope.showError = true;
        $log.log('data loading failed. reason: ' + reason);
      });

    //update chart data when user change the selection
    $scope.axisChange = function() {
      if ($scope.attrForX.value && $scope.attrForY.value) {
        // $scope.chart=null;
        // var inputData = dataTransformer.DTToStockPredition($scope.inputData, $scope.attrForX.value, $scope.attrForY.value, 'input');
        var data = dataTransformer.DTToStockPredition(rawData, $scope.attrForX.value, $scope.attrForY.value);

        // move all data from predicted set to input set, then delete predicted set
        data[0].key = 'Input data';
        _.each(data[1].values, function(d) {
          d.shape = 'circle';
          data[0].values.push(d);
        });
        data.splice(1, 1);
        // $log.log(data);
        $scope.data = data;
      }
    };

    //for stock prediction only
    $scope.getShape = function() {
      return function(d) {
        return d.shape;
      };
    };

    //configure the chart
    $scope.xAxistickformatFunction = function() {
      var dateFormatter = function(d) {
        return d3.time.format('%m/%d/%Y')(new Date(d));
      };
      var numFormatter = d3.format('.1f');

      var formatter = $scope.attrForX.value === 'DATE' ? dateFormatter : numFormatter;
      return formatter;
    };

    $scope.yAxistickformatFunction = function() {
      var dateFormatter = function(d) {
        return d3.time.format('%m/%d/%Y')(new Date(d));
      };
      var numFormatter = d3.format('.1f');

      var formatter = $scope.attrForY.value === 'DATE' ? dateFormatter : numFormatter;
      return formatter;
    };

  }
])
  .controller('stockDTCtrl', ['$scope', '$log', '_', 'dataLoader', 'dataStore', 'dataTransformer', '$q',
    function($scope, $log, _, dataLoader, dataStore, dataTransformer, $q) {
      $scope.showPlaceholder = true;
      $scope.showError = false;

      //prepare the data
      var rawData = {};
      $q.all([dataLoader.get({
        data: 'input.json'
      }).$promise, dataLoader.get({
        data: 'PAL.V_DTP_STOCK_NEW_1D.json'
      }).$promise]).then(function(result) {
          //callback function from the query
          rawData.input = result[0];
          rawData.predicted = result[1];
          $scope.columns = dataTransformer.getNumericColomns(rawData.input.columns, rawData.input.values);
          $scope.attrOptions = [];
          _.each($scope.columns, function(element) {
            $scope.attrOptions.push({
              attrName: element,
              value: element
            });
          });
          $scope.attrOptions.push({
            attrName: 'DATE',
            value: 'DATE'
          });

          $scope.attrForX = {
            attrName: 'DATE',
            value: 'DATE'
          };
          $scope.attrForY = {
            attrName: 'STOCK_CLOSE_PRICE',
            value: 'STOCK_CLOSE_PRICE'
          };
          $scope.axisChange();

          $scope.showPlaceholder = false;
        },
        function(reason) {
          //data loading failed
          $scope.showPlaceholder = false;
          $scope.showError = true;
          $log.log('data loading failed. reason: ' + reason);
        });

      //update chart data when user change the selection
      $scope.axisChange = function() {
        if ($scope.attrForX.value && $scope.attrForY.value) {
          // $scope.chart=null;
          // var inputData = dataTransformer.DTToStockPredition($scope.inputData, $scope.attrForX.value, $scope.attrForY.value, 'input');
          $scope.data = dataTransformer.DTToStockPredition(rawData, $scope.attrForX.value, $scope.attrForY.value);
        }
      };

      //for stock prediction only
      $scope.getShape = function() {
        return function(d) {
          return d.shape;
        };
      };

      //configure the chart
      $scope.xAxistickformatFunction = function() {
        var dateFormatter = function(d) {
          return d3.time.format('%m/%d/%Y')(new Date(d));
        };
        var numFormatter = d3.format('.1f');

        var formatter = $scope.attrForX.value === 'DATE' ? dateFormatter : numFormatter;
        return formatter;
      };

      $scope.yAxistickformatFunction = function() {
        var dateFormatter = function(d) {
          return d3.time.format('%m/%d/%Y')(new Date(d));
        };
        var numFormatter = d3.format('.1f');

        var formatter = $scope.attrForY.value === 'DATE' ? dateFormatter : numFormatter;
        return formatter;
      };

    }
  ])

.controller('stockRGCtrl', ['$scope', '$log', '_', 'dataLoader', 'dataStore', 'dataTransformer', '$q',
  function($scope, $log, _, dataLoader, dataStore, dataTransformer, $q) {
    $scope.showPlaceholder = true;
    $scope.showError = false;

    //prepare the data
    var rawData = {};
    $q.all([dataLoader.get({
      data: 'PAL.LGRG_STOCK_CAUSE.json'
    }).$promise, dataLoader.get({
      data: 'PAL.V_LGRGP_STOCK_1D.json'
    }).$promise]).then(function(result) {
        //callback function from the query
        rawData.input = result[0];
        rawData.predicted = result[1];
        $scope.columns = dataTransformer.getNumericColomns(rawData.input.columns, rawData.input.values);
        $scope.attrOptions = [];
        _.each($scope.columns, function(element) {
          $scope.attrOptions.push({
            attrName: element,
            value: element
          });
        });
        $scope.attrOptions.push({
          attrName: 'DATE',
          value: 'DATE'
        });

        $scope.attrForX = {
          attrName: 'DATE',
          value: 'DATE'
        };
        $scope.attrForY = {
          attrName: 'STOCK_CLOSE_PRICE',
          value: 'STOCK_CLOSE_PRICE'
        };
        $scope.axisChange();

        $scope.showPlaceholder = false;
      },
      function(reason) {
        //data loading failed
        $scope.showPlaceholder = false;
        $scope.showError = true;
        $log.log('data loading failed. reason: ' + reason);
      });

    //update chart data when user change the selection
    $scope.axisChange = function() {
      if ($scope.attrForX.value && $scope.attrForY.value) {
        var data = dataTransformer.DTToStockPredition(rawData, $scope.attrForX.value, $scope.attrForY.value);
        // only show the predicted data
        // $log.log(data);
        $scope.data = [data[1]];
      }
    };

    //for stock prediction only
    $scope.getShape = function() {
      return function(d) {
        return d.shape;
      };
    };

    //configure the chart
    $scope.xAxistickformatFunction = function() {
      var dateFormatter = function(d) {
        return d3.time.format('%m/%d/%Y')(new Date(d));
      };
      var numFormatter = d3.format('.1f');

      var formatter = $scope.attrForX.value === 'DATE' ? dateFormatter : numFormatter;
      return formatter;
    };

    $scope.yAxistickformatFunction = function() {
      var dateFormatter = function(d) {
        return d3.time.format('%m/%d/%Y')(new Date(d));
      };
      var numFormatter = d3.format('.1f');

      var formatter = $scope.attrForY.value === 'DATE' ? dateFormatter : numFormatter;
      return formatter;
    };

  }
])

.controller('gridCtrl', ['_', '$scope', '$log', 'dataLoader', 'dataStore', 'dataTransformer',
  function(_, $scope, $log, dataLoader, dataStore, dataTransformer) {
    $scope.showPlaceholder = true;
    $scope.showError = false;

    // initiate grid option. Skipping initiation will invoke compiling error!
    $scope.gridData = [];
    $scope.columnDefs = [];
    $scope.gridOptions = {
      data: 'gridData',
      // showGroupPanel: true,         ---> buggy in ng-grid 2.0.7, will be fixed in 2.0.8
      enableColumnResize: true,
      columnDefs: 'columnDefs'
    };

    var columns = [];
    dataLoader.get({
        data: 'testdata.json'
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
        $scope.showPlaceholder = false;
        $scope.showError = true;
        $log.log('data loading failed. reason: ' + reason);
      }); //rawData callback

  }
])
  .controller('stockGridCtrl', ['_', '$scope', '$log', 'dataLoader', 'dataStore', 'dataTransformer',
    function(_, $scope, $log, dataLoader, dataStore, dataTransformer) {
      $scope.showPlaceholder = true;
      $scope.showError = false;

      // initiate grid option. Skipping initiation will invoke compiling error!
      $scope.gridData = [];
      $scope.columnDefs = [];
      $scope.gridOptions = {
        data: 'gridData',
        // showGroupPanel: true,         ---> buggy in ng-grid 2.0.7, will be fixed in 2.0.8
        enableColumnResize: true,
        headerRowHeight: 60,
        columnDefs: 'columnDefs'
      };

      var columns = [];
      dataLoader.get({
          data: 'input.json'
        }, function(rawData) {
          $scope.columns = rawData.columns;
          var colWidths = [
            50,
            73,
            61,
            66,
            63,
            84,
            84,
            72,
            70,
            74,
            75,
            78,
            76,
            81,
            55

          ];
          _.each($scope.columns, function(element,index) {
            var column = {
              field: element,
              width:colWidths[index]
            };
            columns.push(column);
          });
          //append the $group to indicate input data or predicted data
          $scope.columnDefs = columns;
          $scope.gridData = dataTransformer.DTToStockGrid(rawData);

          $scope.showPlaceholder = false;
        },
        function(reason) {
          $scope.showPlaceholder = false;
          $scope.showError = true;
          $log.log('data loading failed. reason: ' + reason);
        }); //rawData callback
    }
  ]);