'use strict';

angular.module('dataManager', ['underscore'])
  .factory('dataLoader', ['$resource',
    function($resource) {
      return $resource('data/:data');
    }
  ])
  .factory('dataStore', ['_', '$log',
    function(_, $log) {
      // example of a data object in container:
      // {
      //  name:'example'
      //  data:{}
      // }
      var currentItem = {};
      var container = [];
      var generateTS = function() {
        return new Date().getTime();
      };

      return {
        push: function(name, data) {
          if (!_.isEmpty(data)) {
            var TS = generateTS();
            var dataName = !_.isEmpty(name) ? name : TS;
            container.push({
              'name': dataName,
              'data': data
            });
          }
        },

        getDataList: function() {
          return _.pluck(container, 'name');
        },

        getContainer: function() {
          return container;
        },

        getDataByName: function(name) {
          //requirement: data in the container must be in standard form
          return _.where(container, {
            'name': name
          })[0];
        },

        getCurrentItem: function() {
          return currentItem;
        },

        setCurrentItem: function(item) {
          currentItem = item;
        }

      };
    }
  ])
  .factory('dataTransformer', ['_', '$log',
    function(_, $log) {
      return {
        getNumericColomns: function(columns, values) {
          var numericColomns = [];

          _.each(columns, function(column, colIndex) {
            var isNumberic = true;
            for (var i = 0; i < values.length; i++) {
              if (!_.isNumber(values[i][colIndex])) {
                isNumberic = false;
                break;
              }
            }

            if (isNumberic) {
              numericColomns.push(column);
            }
          });

          return numericColomns;

        },

        stockTonvd3Scatter: function(rawData, xColName, yColName) {
          var columns = rawData.input.columns;
          //push the input data
          var inputValues = [];
          _.each(rawData.input.values, function(row) {
            inputValues.push({
              x: xColName === 'DATE' ? d3.time.format('%m/%d/%Y').parse(row[columns.indexOf(xColName)]) : row[columns.indexOf(xColName)] + Math.random() * 0.00000001,
              y: yColName === 'DATE' ? d3.time.format('%m/%d/%Y').parse(row[columns.indexOf(yColName)]) : row[columns.indexOf(yColName)] + Math.random() * 0.00000001,
              shape: 'circle',
              size: 100
            });
          });

          var finalData = [{
            key: 'Input data',
            color: '#00D0FF',
            values: inputValues
          }];
          return finalData;
        },

        DTToStockPredition: function(rawData) {
          var columns = rawData.input.columns;
          var isCorrect = function(id) {
            var row1 = _.findWhere(rawData.input.values, {
              0: id
            });
            var row2 = _.findWhere(rawData.predicted.values, {
              0: id
            });
            return row1[columns.indexOf('STOCK_TREND')] === row2[columns.indexOf('STOCK_TREND')];
          };

          var getShape = function(trend) {
            //display diamond where the prediction is not accurate
            var shape;
            if (trend === 'UP' || trend === 1) {
              shape = 'triangle-up';
            } else if (trend === 'DOWN' || trend === 0) {
              shape = 'triangle-down';
            } else {
              shape = 'square';
            }
            return shape;
          };


          //categorize the data
          var inputValues=[];
          var correctValues = [];
          var incorrectValues = [];
          _.each(rawData.predicted.values, function(row) {
            // avoid repeat data that appears in predicted values
            var id = row[columns.indexOf('ID')];
            var trend = row[columns.indexOf('STOCK_TREND')];
            if (isCorrect(id)) {
              correctValues.push({
                x: d3.time.format('%m/%d/%Y').parse(row[columns.indexOf('DATE')]),
                y: row[columns.indexOf('STOCK_CLOSE_PRICE')],
                shape: getShape(trend),
                size: 100
              });
            } else {
              incorrectValues.push({
                x: d3.time.format('%m/%d/%Y').parse(row[columns.indexOf('DATE')]),
                y: row[columns.indexOf('STOCK_CLOSE_PRICE')],
                shape: 'diamond',
                size: 100
              });
            }
          });
          //assemble the final data
          var finalData = [{
            key: 'Corret Predictions',
            color: '#00D0FF',
            values: correctValues
          }, {
            key: 'incorrect Predicitons',
            color: '#FF2F00',
            values: incorrectValues
          }];
          return finalData;
        },

        RGToStockPredition: function(rawData) {
          var columns = rawData.input.columns;
          var isCorrect = function(id) {
            var row1 = _.findWhere(rawData.input.values, {
              0: id
            });
            var row2 = _.findWhere(rawData.predicted.values, {
              0: id
            });
            return row1[columns.indexOf('STOCK_TREND')] === row2[columns.indexOf('STOCK_TREND')];
          };

          var getShape = function(trend) {
            //display diamond where the prediction is not accurate
            var shape;
            if (trend === 'UP' || trend === 1) {
              shape = 'triangle-up';
            } else if (trend === 'DOWN' || trend === 0) {
              shape = 'triangle-down';
            } else {
              shape = 'square';
            }
            return shape;
          };


          //categorize the data
          var correctValues = [];
          var incorrectValues = [];
          _.each(rawData.predicted.values, function(row) {
            // avoid repeat data that appears in predicted values
            var id = row[columns.indexOf('ID')];
            var trend = row[columns.indexOf('STOCK_TREND')];
            if (isCorrect(id)) {
              correctValues.push({
                x: d3.time.format('%m/%d/%Y').parse(row[columns.indexOf('DATE')]),
                y: row[columns.indexOf('STOCK_CLOSE_PRICE')],
                shape: getShape(trend),
                size: 100
              });
            } else {
              incorrectValues.push({
                x: d3.time.format('%m/%d/%Y').parse(row[columns.indexOf('DATE')]),
                y: row[columns.indexOf('STOCK_CLOSE_PRICE')],
                shape: 'diamond',
                size: 100
              });
            }
          });
          //assemble the final data
          var finalData = [{
            key: 'Corret Predictions',
            color: '#00D0FF',
            values: correctValues
          }, {
            key: 'incorrect Predicitons',
            color: '#FF2F00',
            values: incorrectValues
          }];
          return finalData;
        },

        DTToStockGrid: function(rawData) {
          var finalData = [];
          var columns = rawData.columns;

          // push the input part
          _.each(rawData.values, function(rowArray) {
            var rowObj = {};
            _.each(columns, function(attr, attrIndex) {
              rowObj[attr] = rowArray[attrIndex];
            });
            finalData.push(rowObj);
          });
          return finalData;
        },

        LRToGrid: function(rawData) {
          var finalData = [];
          var columns = rawData.input.columns;

          // push the input part
          _.each(rawData.input.values, function(rowArray) {
            var rowObj = {};
            _.each(columns, function(attr, attrIndex) {
              rowObj[attr] = rowArray[attrIndex];
            });
            rowObj.$group = 'input';
            finalData.push(rowObj);
          });
          _.each(list, function(value, key, list) {

            // body

          });

          // push the predicted part
          _.each(rawData.predicted.values, function(rowArray) {
            var rowObj = {};
            _.each(columns, function(attr, attrIndex) {
              rowObj[attr] = rowArray[attrIndex];
            });
            rowObj.$group = 'predicted';
            finalData.push(rowObj);
          });
          return finalData;
        }
      };
    }
  ]);