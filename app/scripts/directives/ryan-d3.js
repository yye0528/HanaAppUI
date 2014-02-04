'use strict';

angular.module('RyanD3',['d3service'])
	.directive("linearRegression",function(d3){
		return{
      restrict:'E',
      sope:{
        data:'=',
        width:'@',
        height:'@'
      },
      template:'<div id="chart"></div>',
      link:function(){
        nv.addGraph(function(){
          var chart = nv.models.scatterChart()
                        .showDistX(true)
                        .showDistY(true)
                        .color(d3.scale.category10().range());

          chart.xAxis.tickFormat(d3.format('.02f'));
          chart.yAxis.tickFormat(d3.format('.02f'));

          d3.select('#chart svg')
              .datum(data(1,40))
            .transition().duration(500)
              .call(chart);

          nv.utils.windowResize(chart.update);

          return chart;
        });//end of addGraph()
      }//end of link function

    };
	});

