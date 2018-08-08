/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/misc/Format","sap/gantt/config/TimeHorizon"],function(F,T){"use strict";var U={};U.assign=function(i,d){if(typeof(i)!==typeof(d)){return d;}else if((typeof i==="undefined")||i===null){return d;}else{return i;}};U.assignDeep=function(i,d){if(!i&&!d){return null;}else if(i&&!d){return i;}else if(!i&&d){return d;}else if(typeof(i)==="object"&&typeof(d)==="object"){var r=i;for(var a in d){if(typeof(r[a])!=="boolean"&&!r[a]){r[a]=d[a];}else if(typeof(d[a])==="object"&&typeof(r[a])==="object"){r[a]=this.assignDeep(r[a],d[a]);}}return r;}else{return i;}};U.generateRowUid=function(d,o,s,p,r){jQuery.each(d,function(k,v){v.uid=v.id;if(p){v.uid=p+"|"+v.uid;}else if(v.bindingObj&&v.bindingObj.findNode){var n=v.bindingObj.findNode(v.rowIndex);while(n.parent&&n.level>0){n=n.parent;v.uid=n.context.getObject()[r]+"|"+v.uid;}}var a=(v.index===undefined)?-1:v.index;var c=(v.chartScheme===undefined)?"":v.chartScheme;v.uid="PATH:"+v.uid+"|SCHEME:"+c+"["+a+"]";v.data.uid=v.uid;for(var i=0;i<s.length;i++){var D,b;if(typeof s[i]==="string"){D=s[i];b="id";}else{D=s[i].name;b=s[i].idName?s[i].idName:"id";}if(D in v.data){for(var j=0;j<v.data[D].length;j++){var e=v.data[D][j];if(e[b]===undefined){e[b]=jQuery.sap.uid();}e.uid=v.uid+"|DATA:"+D+"["+e[b]+"]";e.__id__=e[b];}}}});};U.getChartSchemeByShapeUid=function(s){return U.parseUid(s).chartScheme||"";};U.generateUidForRelationship=function(d,r){var s="relationship";var D="PATH:DUMMY|SCHEME:DUMMY[0]";for(var i=0;i<d.length;i++){if(d[i][r]===undefined){d[i][r]=jQuery.sap.uid();}d[i].uid=D+"|DATA:"+s+"["+d[i][r]+"]";d[i].__id__=d[i][r];}};U.generateObjectPathToObjectMap=function(d,m,p){var r;for(var i in d){var o=d[i],a,b;if(o.objectInfoRef){a=o.objectInfoRef.id;o=o.objectInfoRef;}else{a=o.id;}if(p&&p!=""){a=p.concat(".").concat(a);}b=a.concat("-").concat(U.parseUid(o.uid).rowIndex);m[b]=o;if(o.children&&o.children.length>0){r=this.generateObjectPathToObjectMap(o.children,m,a);}}return r;};U.getShapeDataNameByUid=function(s){return U.parseUid(s).shapeDataName;};U.getIdByUid=function(u,r){return r?U.parseUid(u).rowId:U.parseUid(u).shapeId;};U.parseUid=function(u){var r=/(PATH:(.+)\|SCHEME:(.*?\[-?\d+\]))(?:\|DATA:(.+)\[(.*)\])?$/g;var m=r.exec(u);var a={};if(m){var c=m[3];if(c){var R=c.match(/\[-?\d+\]/)[0].slice(1,-1);c=c.replace(/\[-?\d+\]/,"");}var s=m[1],b=m[2],d=b.split("|"),e=d[d.length-1];a={rowId:e,rowPath:b,rowUid:s,chartScheme:c,shapeDataName:m[4],shapeId:m[5],rowIndex:R};}return a;};U.scaleBySapUiSize=function(m,n){switch(m){case"sapUiSizeCozy":return n*1.5;case"sapUiSizeCondensed":return n*0.78;default:return n;}};U.findSapUiSizeClass=function(c){var a,b;if(c){a=c.$();}else{a=jQuery("body");}if(a){b=a.closest(".sapUiSizeCompact,.sapUiSizeCondensed,.sapUiSizeCozy");if(b.hasClass("sapUiSizeCondensed")){return"sapUiSizeCondensed";}else if(b.hasClass("sapUiSizeCompact")){return"sapUiSizeCompact";}else if(b.hasClass("sapUiSizeCozy")){return"sapUiSizeCozy";}}};U.floatEqual=function(v,V){return Math.abs(v-V)<0.0001;};U.calculateStringLength=function(s){var l=0;if(s.match("[\u4E00-\u9FFF]")===null){l=s.length;}else{l=s.length+s.match(/[\u4E00-\u9FFF]/g).length;}return l;};U.judgeTimeHorizonValidity=function(v,t){var V=F.abapTimestampToDate(v.getStartTime()).getTime(),o=F.abapTimestampToDate(v.getEndTime()).getTime(),a=F.abapTimestampToDate(t.getStartTime()).getTime(),b=F.abapTimestampToDate(t.getEndTime()).getTime();return(V-a>=0)&&(b-o>=0);};U.getShapeDatumById=function(i,c){return U.getDatumById(i,"sap-gantt-shape-id",c);};U.getRowDatumById=function(i,c){return U.getDatumById(i,"sap-gantt-row-id",c)||[];};U.getRowDatumRefById=function(i,c){return U.getRowDatumById(i,c).map(function(I){return I.objectInfoRef;});};U.getRowDatumByShapeUid=function(s,c){var p=this.parseUid(s),r=p.rowUid,R=p.rowId;var d=null;var a=this.getRowDatumById(R,c);var f=a.filter(function(d){return d.objectInfoRef.uid.indexOf(r)>=0;});if(f.length>0){d=f[0].objectInfoRef;}return d;};U.getShapeDatumByShapeUid=function(s,c){var p=this.parseUid(s),S=p.shapeId,r=p.rowUid;var a=this.getShapeDatumById(S,c);var f=a.filter(function(d){return d.uid.indexOf(r)>=0;});return f[0];};U.getRowDatumByEventTarget=function(t){var d=null;var a=jQuery(t).closest("g[data-sap-gantt-row-id]");if(a.length){d=d3.select(a.get(0)).datum();}return d;};U.getDatumById=function(i,a,c){var p=i?i:"";var I=p;if(typeof p==="string"){I=[p];}var d=[];I.forEach(function(b){var s=["[id='",c,"']"," [data-",a,"='",b,"']"].join("");$(s).each(function(_,e){var f=d3.select(e),n=f.datum();var g=d.some(function(o){var O=o.uid||o.objectInfoRef.uid,N=n.uid||n.objectInfoRef.uid;if(O!==N){return false;}else{var S=o.shapeData?o.shapeData.length:0;var h=n.shapeData?n.shapeData.length:0;return S===h;}});if(!g){d.push(n);}});});return jQuery.sap.unique(d);};U.attributeEqualSelector=function(a,v){return"["+a+"="+"'"+v+"'"+"]";};U.calculateHorizonByWidth=function(o,O,c,C){var a=F.abapTimestampToDate(o.getStartTime());var b=F.abapTimestampToDate(o.getEndTime());var r=Math.abs(a.getTime()-b.getTime())/O;var s;if(C){s=C;}else{s=a;}var e=new Date();e.setTime(s.getTime()+c*r);var d=new T({startTime:s,endTime:e});return d;};return U;},true);