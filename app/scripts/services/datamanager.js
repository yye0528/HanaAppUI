'use strict';

angular.module('dataManager',['underscore'])
	.factory('dataLoader', ['$resource',function($resource){
		return $resource(
			// 'https:',
			// {}
		);
	}])
	.factory('dataStore', ['_','$log',function(_,$log){
		// example of a data object in container:
		// {
		// 	name:'example'
		// 	data:{}
		// }
		var container=[];
		var generateTS=function(){
			return new Date().getTime();
		};

		return {
			push:function(name,data){
				if(!_.isEmpty(data)){
					var TS=generateTS();
					var dataName = !_.isEmpty(name) ? name : TS;
					container.push({'name':dataName,'data':data});
				}
			},

			getDataList:function(){                                                                                    
				return _.pluck(container,'name');
			},

			getContainer:function(){                                                                                    
				return container;
			},

			getDataByTS:function(TS){
				return container[TS];
			},

			getDataByName:function(name){
				//requirement: data in the container must be in standard form
				return _.where(container,{'name':name})[0]; 
			}
		};
	}])	
	.factory('dataTransformer', ['_','$log',function(_,$log){
		return {
			LRTonvd3Scatter:function(rawData,xColName,yColName,sizeColName){
				//push the input data
				var inputValues=[];
				_.each(rawData.input.values,function(element){
						inputValues.push({
							x:element[rawData.input.columns.indexOf(xColName)]+Math.random()*0.001,
							y:element[rawData.input.columns.indexOf(yColName)]+Math.random()*0.001,
							size:_.isEmpty(sizeColName)?100:element[rawData.input.columns.indexOf(sizeColName)]+Math.random()*0.001
						});
				});
				//push the predicted data
				var predictedValues=[];
				_.each(rawData.predicted.values,function(element,index){
						predictedValues.push({
							x:element[rawData.predicted.columns.indexOf(xColName)]+Math.random()*0.001,
							y:element[rawData.predicted.columns.indexOf(yColName)]+Math.random()*0.001,
							size:_.isEmpty(sizeColName)?100:element[rawData.predicted.columns.indexOf(sizeColName)]+Math.random()*0.001
						})
				});
				//assemble the final data
				var finalData=[
					{
						key:'Predicted',
						color:'#FF2F00',
						values:predictedValues
					},
					{
						key:'Input',
						color:'00D0FF',
						values:inputValues
					}
				];
				return finalData;
			}
		};
	}]);