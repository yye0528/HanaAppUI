'use strict';

angular.module('directives',['d3'])
  .directive('d3Bars', function(d3) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        label: '@',
        barHeight:'@',
        barMargin:'@',
        maxWidth:'@',
        onClick: '&'
      },
      link: function(scope, iElement) {
        var svg = d3.select(iElement[0])
            .append('svg')
            .attr('width', '100%');

        // on window resize, re-render d3 canvas
        window.onresize = function() {
          return scope.$apply();
        };
        scope.$watch(function(){
            return angular.element(window)[0].innerWidth;
          }, function(){
            scope.render(scope.data);
          }
        );

        // watch for data changes and re-render
        scope.$watch('data', function(newVals) {
          scope.transit(newVals);
        }, true);

        //transit
        scope.transit=function(data){
          svg.selectAll('rect')
            .data(data)
            .transition()
              .duration(1000) // time of duration
              .attr('width', function(d){
                return d.score/(scope.maxWidth/scope.width);
              }); // width based on scale;
        };

        // define render function
        scope.render = function(data){
          // remove all previous items before render
          svg.selectAll('*').remove();

          // setup variables
          var width, height, max, barHeight, barMargin;
          barHeight=parseInt(scope.barHeight);
          barMargin=parseInt(scope.barMargin);

          width = d3.select(iElement[0])[0][0].offsetWidth - 20;
          scope.width=width;
            // 20 is for margins and can be changed
          height = scope.data.length * (barHeight+barMargin);
          scope.height=height;
            // 35 = 30(bar height) + 5(margin between bars)
          max = parseInt(scope.maxWidth);
            // this can also be found dynamically when the data is not static
            // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

          // set the height based on the calculations above
          svg.attr('height', height);

          //create the rectangles for the bar chart
          svg.selectAll('rect')
            .data(data)
            .enter()
              .append('rect')
              .on('click', function(d){scope.onClick({item: d});})
              .attr('height', barHeight) // height of each bar
              .attr('width', 0) // initial width of 0 for transition
              .attr('x', 10) // half of the 20 side margin specified above
              .attr('y', function(d, i){
                return i * (barHeight+barMargin);
              }) // height + margin between bars
              .transition()
                .duration(1000) // time of duration
                .attr('width', function(d){
                  return d.score/(max/width);
                }); // width based on scale

          svg.selectAll('text')
            .data(data)
            .enter()
              .append('text')
              .attr('fill', '#fff')
              .attr('y', function(d, i){return i * (barHeight+barMargin) + 22;})
              .attr('x', 15)
              .text(function(d){return d[scope.label];});

        };
      }
    };
  });