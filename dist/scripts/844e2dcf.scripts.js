"use strict";angular.module("dataManager",["underscore"]).factory("dataLoader",["$resource",function(a){return a()}]).factory("dataStore",["_","$log",function(a){var b=[],c=function(){return(new Date).getTime()};return{push:function(d,e){if(!a.isEmpty(e)){var f=c(),g=a.isEmpty(d)?f:d;b.push({name:g,data:e})}},getDataList:function(){return a.pluck(b,"name")},getContainer:function(){return b},getDataByTS:function(a){return b[a]},getDataByName:function(c){return a.where(b,{name:c})[0]}}}]).factory("dataTransformer",["_","$log",function(a){return{LRTonvd3Scatter:function(b,c,d,e){var f=[];a.each(b.input.values,function(g){f.push({x:g[b.input.columns.indexOf(c)]+.001*Math.random(),y:g[b.input.columns.indexOf(d)]+.001*Math.random(),size:a.isEmpty(e)?100:g[b.input.columns.indexOf(e)]+.001*Math.random()})});var g=[];a.each(b.predicted.values,function(f){g.push({x:f[b.predicted.columns.indexOf(c)]+.001*Math.random(),y:f[b.predicted.columns.indexOf(d)]+.001*Math.random(),size:a.isEmpty(e)?100:f[b.predicted.columns.indexOf(e)]+.001*Math.random()})});var h=[{key:"Predicted",color:"#FF2F00",values:g},{key:"Input",color:"00D0FF",values:f}];return h}}}]),angular.module("controllers",["dataManager","underscore","ngDropdowns"]).controller("scatterController",["$scope","$log","_","dataStore","dataTransformer",function(a,b,c,d,e){var f={input:{columns:["ID","LIFESPEND","INCOME","LOYALTY","NEWSPEND"],rowCount:150,values:[[1,7.2,6.1,2.5,3.6],[2,5.4,1.5,.4,3.4],[3,6.9,5.7,2.3,3.2],[4,5.5,4,1.3,2.3],[5,6.1,4.7,1.4,2.9],[6,5,1.4,.2,3.3],[7,5.8,5.1,1.9,2.7],[8,5.1,1.5,.2,3.4],[9,6.4,5.3,2.3,3.2],[10,5.7,4.5,1.3,2.8],[11,6.8,5.5,2.1,3],[12,4.3,1.1,.1,3],[13,7,4.7,1.4,3.2],[14,5.4,1.7,.2,3.4],[15,5.4,4.5,1.5,3],[16,5.7,4.2,1.3,2.9],[17,6.3,5.6,1.8,2.9],[18,5.1,1.5,.4,3.7],[19,6.3,5.1,1.5,2.8],[20,5.6,3.9,1.1,2.5],[21,5.7,3.5,1,2.6],[22,5.4,1.3,.4,3.9],[23,6,4.8,1.8,3],[24,5.5,4.4,1.2,2.6],[25,4.7,1.3,.2,3.2],[26,6.8,4.8,1.4,2.8],[27,5.9,4.2,1.5,3],[28,5.1,1.9,.4,3.8],[29,5,1.3,.3,3.5],[30,5.8,1.2,.2,4],[31,7.7,6.7,2,2.8],[32,5.2,3.9,1.4,2.7],[33,4.4,1.4,.2,2.9],[34,5,1.6,.2,3],[35,7.6,6.6,2.1,3],[36,5.1,1.4,.3,3.5],[37,6,4.5,1.6,3.4],[38,5.7,1.7,.3,3.8],[39,6.2,5.4,2.3,3.4],[40,7.3,6.3,1.8,2.9],[41,5.7,5,2,2.5],[42,6.7,5.6,2.4,3.1],[43,6.1,4.7,1.2,2.8],[44,5.7,1.5,.4,4.4],[45,5.6,4.2,1.3,2.7],[46,5.5,1.4,.2,4.2],[47,6.3,5.6,2.4,3.4],[48,6.7,4.7,1.5,3.1],[49,6.3,6,2.5,3.3],[50,6.3,4.4,1.3,2.3],[51,6,5,1.5,2.2],[52,6.4,5.6,2.2,2.8],[53,6.3,4.9,1.8,2.7],[54,6.2,4.5,1.5,2.2],[55,6.3,4.9,1.5,2.5],[56,5.5,4,1.3,2.5],[57,6.9,4.9,1.5,3.1],[58,4.6,1.5,.2,3.1],[59,5.6,4.9,2,2.8],[60,6.4,5.6,2.1,2.8],[61,4.8,1.6,.2,3.4],[62,5.7,4.2,1.2,3],[63,5,3.3,1,2.3],[64,6.1,5.6,1.4,2.6],[65,5.4,1.5,.2,3.7],[66,6.4,4.3,1.3,2.9],[67,5.5,1.3,.2,3.5],[68,7.2,5.8,1.6,3],[69,6.5,5.2,2,3],[70,5.5,3.8,1.1,2.4],[71,4.7,1.6,.2,3.2],[72,6,4,1,2.2],[73,6.1,4,1.3,2.8],[74,7.7,6.7,2.2,3.8],[75,5,1.2,.2,3.2],[76,4.9,1.4,.2,3],[77,5,1.6,.4,3.4],[78,6,5.1,1.6,2.7],[79,5.5,3.7,1,2.4],[80,5.1,1.5,.3,3.8],[81,4.9,1.5,.1,3.1],[82,5,1.6,.6,3.5],[83,5.2,1.5,.2,3.5],[84,4.6,1.4,.2,3.2],[85,6.5,5.5,1.8,3],[86,4.9,4.5,1.7,2.5],[87,7.1,5.9,2.1,3],[88,7.7,6.9,2.3,2.6],[89,4.8,1.9,.2,3.4],[90,6.4,4.5,1.5,3.2],[91,5.1,1.4,.2,3.5],[92,5.8,4.1,1,2.7],[93,6.1,4.9,1.8,3],[94,6.7,5,1.7,3],[95,5.8,4,1.2,2.6],[96,5.1,1.6,.2,3.8],[97,6.9,5.4,2.1,3.1],[98,4.8,1.6,.2,3.1],[99,4.5,1.3,.3,2.3],[100,6.8,5.9,2.3,3.2],[101,6,4.5,1.5,2.9],[102,7.7,6.1,2.3,3],[103,6.4,5.3,1.9,2.7],[104,5.9,5.1,1.8,3],[105,5,1.4,.2,3.6],[106,5.4,1.7,.4,3.9],[107,6.6,4.6,1.3,2.9],[108,5.9,4.8,1.8,3.2],[109,5.8,5.1,1.9,2.7],[110,5.2,1.4,.2,3.4],[111,7.4,6.1,1.9,2.8],[112,4.4,1.3,.2,3.2],[113,6.9,5.1,2.3,3.1],[114,5.6,4.1,1.3,3],[115,6.5,5.8,2.2,3],[116,5,3.5,1,2],[117,6.2,4.3,1.3,2.9],[118,4.9,1.5,.1,3.1],[119,4.9,3.3,1,2.4],[120,5.6,4.5,1.5,3],[121,6.6,4.4,1.4,3],[122,6.7,5.7,2.1,3.3],[123,4.6,1.4,.3,3.4],[124,5.1,3,1.1,2.5],[125,5,1.5,.2,3.4],[126,4.8,1.4,.1,3],[127,4.9,1.5,.1,3.1],[128,6.3,4.7,1.6,3.3],[129,7.9,6.4,2,3.8],[130,6.4,5.5,1.8,3.1],[131,6.1,4.6,1.4,3],[132,4.6,1,.2,3.6],[133,6.7,5.8,1.8,2.5],[134,5.7,4.1,1.3,2.8],[135,6.3,5,1.9,2.5],[136,5.6,3.6,1.3,2.9],[137,6.5,5.1,2,3.2],[138,7.2,6,1.8,3.2],[139,6.5,4.6,1.5,2.8],[140,6.7,5.2,2.3,3],[141,6.7,4.4,1.4,3.1],[142,5.2,1.5,.1,4.1],[143,4.8,1.4,.3,3],[144,6.7,5.7,2.5,3.3],[145,4.4,1.3,.2,3],[146,5.1,1.7,.5,3.3],[147,5.3,1.5,.2,3.7],[148,5.8,3.9,1.2,2.7],[149,6.2,4.8,1.8,2.8],[150,5.8,5.1,2.4,2.8]]},params:[{defaultValue:2,description:"Number of threads.",name:"THREAD_NUMBER"}],predicted:{columns:["ID","LIFESPEND","INCOME","LOYALTY","NEWSPEND"],rowCount:2,values:[[151,4.8,2.5,3.1,4.5],[152,9.8,7.5,4.2,7.6]]}};a.columns=f.input.columns,a.attrOptions=[],a.attrForX={attrName:"Please select",value:!1},a.attrForY={attrName:"Please select",value:!1},c.each(a.columns,function(b){a.attrOptions.push({attrName:b,value:b})}),a.axisChange=function(){a.attrForX.value&&a.attrForY.value&&(a.data=e.LRTonvd3Scatter(f,a.attrForX.value,a.attrForY.value,""))},a.axistickformatFunction=function(){return d3.format(".1f")},a.getShapeCross=function(){return function(){return"circle"}}}]).controller("TabsCtrl",function(a){a.tabs=[{title:"Dynamic Title 1",content:"Dynamic content 1"},{title:"Dynamic Title 2",content:"Dynamic content 2",disabled:!0}],a.alertMe=function(){setTimeout(function(){alert("You've selected the alert tab!")})},a.navType="pills"}),angular.module("visDirectives",[]).directive("visScatter",function(){return{restrict:"EA",templateUrl:"/views/vis-scatter-template.html",scope:!0}}),angular.module("webApp",["ngCookies","ngResource","ngSanitize","ngRoute","underscore","dataManager","controllers","visDirectives","nvd3ChartDirectives","ngDropdowns","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/vis",{templateUrl:"/views/vis-scatter-template.html"}).when("/",{templateUrl:"/views/vis-select-tabs.html"}).otherwise({redirectTo:"/"})}]);