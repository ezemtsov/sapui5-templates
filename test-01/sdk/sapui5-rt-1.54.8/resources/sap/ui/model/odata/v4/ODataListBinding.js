/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterOperator","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/odata/OperationMode","./Context","./lib/_Cache","./lib/_Helper","./ODataParentBinding"],function(q,S,B,C,F,a,L,b,O,c,_,d,e){"use strict";var s="sap.ui.model.odata.v4.ODataListBinding",m={change:true,dataReceived:true,dataRequested:true,refresh:true};var f=L.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(M,p,o,v,g,P){L.call(this,M,p);if(p.slice(-1)==="/"){throw new Error("Invalid path: "+p);}this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aApplicationFilters=d.toArray(g);this.oCachePromise=S.resolve();this.sChangeReason=M.bAutoExpandSelect?"AddVirtualContext":undefined;this.aChildCanUseCachePromises=[];this.oDiff=undefined;this.aFilters=[];this.mPreviousContextsByPath={};this.aPreviousData=[];this.sRefreshGroupId=undefined;this.aSorters=d.toArray(v);this.applyParameters(q.extend(true,{},P));this.oHeaderContext=this.bRelative?null:c.create(this.oModel,this,p);this.setContext(o);M.bindingCreated(this);}});e(f.prototype);f.prototype._delete=function(g,E,o){var t=this;if(!o.isTransient()&&this.hasPendingChanges()){throw new Error("Cannot delete due to pending changes");}return this.deleteFromCache(g,E,String(o.iIndex),function(I,h){var j,i,p,r;if(I===-1){o.destroy();delete t.aContexts[-1];}else{for(i=I;i<t.aContexts.length;i+=1){o=t.aContexts[i];if(o){t.mPreviousContextsByPath[o.getPath()]=o;}}r=t.oModel.resolve(t.sPath,t.oContext);t.aContexts.splice(I,1);for(i=I;i<t.aContexts.length;i+=1){if(t.aContexts[i]){p=h[i]["@$ui5.predicate"];j=r+(p||"/"+i);o=t.mPreviousContextsByPath[j];if(o){delete t.mPreviousContextsByPath[j];if(o.getIndex()===i){o.checkUpdate();}else{o.setIndex(i);}}else{o=c.create(t.oModel,t,j,i);}t.aContexts[i]=o;}}}t.iMaxLength-=1;t._fireChange({reason:C.Remove});});};f.prototype.applyParameters=function(p,g){var o=this.oModel.buildBindingParameters(p,["$$groupId","$$operationMode","$$updateGroupId"]),h;h=o.$$operationMode||this.oModel.sOperationMode;if(!h&&(this.aSorters.length||this.aApplicationFilters.length)){throw new Error("Unsupported operation mode: "+h);}this.sOperationMode=h;this.sGroupId=o.$$groupId;this.sUpdateGroupId=o.$$updateGroupId;this.mQueryOptions=this.oModel.buildQueryOptions(p,true);this.mParameters=p;this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(g);};f.prototype.attachEvent=function(E){if(!(E in m)){throw new Error("Unsupported event '"+E+"': v4.ODataListBinding#attachEvent");}return L.prototype.attachEvent.apply(this,arguments);};f.prototype.create=function(i){var o,v,g,r=this.oModel.resolve(this.sPath,this.oContext),t=this;if(!r){throw new Error("Binding is not yet resolved: "+this);}if(this.aContexts[-1]){throw new Error("Must not create twice");}this.checkSuspended();v=r.slice(1);if(this.bRelative&&this.oContext.fetchCanonicalPath){v=this.oContext.fetchCanonicalPath().then(function(h){return d.buildPath(h,t.sPath).slice(1);});}g=this.createInCache(this.getUpdateGroupId(),v,"",i,function(){o.destroy();delete t.aContexts[-1];t._fireChange({reason:C.Remove});}).then(function(){var G;t.iMaxLength+=1;if(t.isRefreshable()){G=t.getGroupId();return t.refreshSingle(o,t.oModel.isDirectGroup(G)||t.oModel.isAutoGroup(G)?G:"$auto");}});o=c.create(this.oModel,this,r+"/-1",-1,g);this.aContexts[-1]=o;this._fireChange({reason:C.Add});return o;};f.prototype.createContexts=function(g,l,r){var h=false,o=this.oContext,j,i,k=r.$count,I=this.aContexts.length,n=this.bLengthFinal,M=this.oModel,p=M.resolve(this.sPath,o),P,t=this;function u(N){var i;for(i=N;i<t.aContexts.length;i+=1){if(t.aContexts[i]){t.aContexts[i].destroy();}}while(N>0&&!t.aContexts[N-1]){N-=1;}t.aContexts.length=N;h=true;}for(i=g;i<g+r.length;i+=1){if(this.aContexts[i]===undefined){h=true;P=r[i-g]["@$ui5.predicate"];j=p+(P||"/"+i);if(j in this.mPreviousContextsByPath){this.aContexts[i]=this.mPreviousContextsByPath[j];delete this.mPreviousContextsByPath[j];this.aContexts[i].setIndex(i);this.aContexts[i].checkUpdate();}else{this.aContexts[i]=c.create(M,this,j,i);}}}if(Object.keys(this.mPreviousContextsByPath).length){sap.ui.getCore().addPrerenderingTask(function(){Object.keys(t.mPreviousContextsByPath).forEach(function(p){t.mPreviousContextsByPath[p].destroy();delete t.mPreviousContextsByPath[p];});});}if(k!==undefined){if(this.aContexts.length>k){u(k);}this.iMaxLength=k;this.bLengthFinal=true;}else{if(this.aContexts.length>this.iMaxLength){this.iMaxLength=Infinity;}if(r.length<l){this.iMaxLength=g+r.length;if(this.aContexts.length>this.iMaxLength){u(this.iMaxLength);}}if(!(g>I&&r.length===0)){this.bLengthFinal=this.aContexts.length===this.iMaxLength;}}if(this.bLengthFinal!==n){h=true;}return h;};f.prototype.deregisterChange=function(p,l,i){var o=this.oCachePromise.getResult();if(!this.oCachePromise.isFulfilled()){return;}if(o){o.deregisterChange(d.buildPath(i,p),l);}else if(this.oContext){this.oContext.deregisterChange(d.buildPath(this.sPath,i,p),l);}};f.prototype.destroy=function(){this.aContexts.forEach(function(o){o.destroy();});if(this.oHeaderContext){this.oHeaderContext.destroy();}if(this.aContexts[-1]){this.aContexts[-1].destroy();}this.oModel.bindingDestroyed(this);this.oCachePromise=undefined;this.oContext=undefined;L.prototype.destroy.apply(this);};f.prototype.doCreateCache=function(r,Q,o){var i;if(!Object.keys(this.mParameters).length){i=this.getQueryOptionsForPath("",o);if(Q.$orderby&&i.$orderby){Q.$orderby+=","+i.$orderby;}if(Q.$filter&&i.$filter){Q.$filter="("+Q.$filter+") and ("+i.$filter+")";}Q=q.extend({},i,Q);}return _.create(this.oModel.oRequestor,r,Q,this.oModel.bAutoExpandSelect);};f.prototype.doFetchQueryOptions=function(o){var g=this.getOrderby(this.mQueryOptions.$orderby),t=this;return this.fetchFilter(o,this.mQueryOptions.$filter).then(function(h){return t.mergeQueryOptions(t.mQueryOptions,g,h);});};f.prototype.enableExtendedChangeDetection=function(D,k){if(k!==undefined){throw new Error("Unsupported property 'key' with value '"+k+"' in binding info for "+this);}return L.prototype.enableExtendedChangeDetection.apply(this,arguments);};f.prototype.fetchFilter=function(o,g){var n=[],t=this;function h(l,p){var u=l.join(p);return l.length>1?"("+u+")":u;}function i(l,E){var p,v=d.formatLiteral(l.oValue1,E),u=decodeURIComponent(l.sPath);switch(l.sOperator){case F.BT:p=u+" ge "+v+" and "+u+" le "+d.formatLiteral(l.oValue2,E);break;case F.EQ:case F.GE:case F.GT:case F.LE:case F.LT:case F.NE:p=u+" "+l.sOperator.toLowerCase()+" "+v;break;case F.Contains:case F.EndsWith:case F.StartsWith:p=l.sOperator.toLowerCase()+"("+u+","+v+")";break;default:throw new Error("Unsupported operator: "+l.sOperator);}return p;}function j(l,A,p){var u=[],v={};l.forEach(function(w){v[w.sPath]=v[w.sPath]||[];v[w.sPath].push(w);});l.forEach(function(w){var x;if(w.aFilters){u.push(j(w.aFilters,w.bAnd,p).then(function(y){return"("+y+")";}));return;}x=v[w.sPath];if(!x){return;}delete v[w.sPath];u.push(k(x,p));});return S.all(u).then(function(w){return w.join(A?" and ":" or ");});}function k(G,l){var M=t.oModel.getMetaModel(),p=M.getMetaContext(t.oModel.resolve(t.sPath,o)),P=M.fetchObject(r(G[0].sPath,l),p);return P.then(function(u){var v;if(!u){throw new Error("Type cannot be determined, no metadata for path: "+p.getPath());}v=G.map(function(w){var x,y,z=w.sOperator;if(z===F.All||z===F.Any){x=w.oCondition;y=w.sVariable;if(z===F.Any&&!x){return w.sPath+"/any()";}l=q.extend({},l);l[y]=r(w.sPath,l);return(x.aFilters?j(x.aFilters,x.bAnd,l):k([x],l)).then(function(A){return w.sPath+"/"+w.sOperator.toLowerCase()+"("+y+":"+A+")";});}return i(w,u.$Type);});return S.all(v).then(function(R){return h(R," or ");});});}function r(p,l){var u=p.split("/");u[0]=l[u[0]];return u[0]?u.join("/"):p;}return S.all([j(this.aApplicationFilters,true,{}),j(this.aFilters,true,{})]).then(function(l){if(l[0]){n.push(l[0]);}if(l[1]){n.push(l[1]);}if(g){n.push(g);}return h(n,") and (");});};f.prototype.fetchValue=function(p,l,g){var t=this;return this.oCachePromise.then(function(o){var r;if(o){r=t.getRelativePath(p);if(r!==undefined){return o.fetchValue("$cached",r,undefined,l);}}if(t.oContext){return t.oContext.fetchValue(p,l,g);}});};f.prototype.filter=function(v,g){this.checkSuspended();if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes");}if(g===a.Control){this.aFilters=d.toArray(v);}else{this.aApplicationFilters=d.toArray(v);}this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(C.Filter);return this;};f.prototype.getContexts=function(i,l,M){var g,o=this.oContext,h,D=false,j=false,G,p,r=!!this.sChangeReason,k,v,t=this;q.sap.log.debug(this+"#getContexts("+i+", "+l+", "+M+")",undefined,s);this.checkSuspended();if(i!==0&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" first parameter must be 0 if extended change detection is enabled, but is "+i);}if(M!==undefined&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" third parameter must not be set if extended change detection is enabled");}if(this.bRelative&&!o){return[];}g=this.sChangeReason||C.Change;this.sChangeReason=undefined;if(g==="AddVirtualContext"){sap.ui.getCore().addPrerenderingTask(function(){t.sChangeReason="RemoveVirtualContext";t._fireChange({reason:C.Change});t.reset(C.Refresh);},true);v=c.create(this.oModel,this,this.oModel.resolve(this.sPath,this.oContext)+"/-2",-2);return[v];}if(g==="RemoveVirtualContext"){return[];}i=i||0;l=l||this.oModel.iSizeLimit;if(!M||M<0){M=0;}k=this.aContexts[-1]?i-1:i;if(!this.bUseExtendedChangeDetection||!this.oDiff){p=this.oCachePromise.then(function(n){if(n){G=t.sRefreshGroupId||t.getGroupId();t.sRefreshGroupId=undefined;return n.read(k,l,M,G,function(){D=true;t.fireDataRequested();});}else{return o.fetchValue(t.sPath).then(function(R){var u;R=R||[];u=R.$count;if(k<0){R=[R[-1]].concat(R.slice(0,l-1));}else{R=R.slice(k,k+l);}R.$count=u;return{value:R};});}});if(p.isFulfilled()&&r){p=Promise.resolve(p);}p.then(function(R){var n;if(!t.bRelative||t.oContext===o){n=t.createContexts(k,l,R.value);if(t.bUseExtendedChangeDetection){t.oDiff={aDiff:t.getDiff(R.value,k),iLength:l};}if(j){if(n){t._fireChange({reason:g});}else{t.oDiff=undefined;}}}if(D){t.fireDataReceived({data:{}});}},function(E){if(D){t.fireDataReceived(E.canceled?{data:{}}:{error:E});}throw E;})["catch"](function(E){t.oModel.reportError("Failed to get contexts for "+t.oModel.sServiceUrl+t.oModel.resolve(t.sPath,t.oContext).slice(1)+" with start index "+i+" and length "+l,s,E);});j=true;}this.iCurrentBegin=k;this.iCurrentEnd=k+l;if(k===-1){h=this.aContexts.slice(0,k+l);h.unshift(this.aContexts[-1]);}else{h=this.aContexts.slice(k,k+l);}if(this.bUseExtendedChangeDetection){if(this.oDiff&&l!==this.oDiff.iLength){throw new Error("Extended change detection protocol violation: Expected "+"getContexts(0,"+this.oDiff.iLength+"), but got getContexts(0,"+l+")");}h.dataRequested=!this.oDiff;h.diff=this.oDiff?this.oDiff.aDiff:[];}this.oDiff=undefined;return h;};f.prototype.getCurrentContexts=function(){var g,l=Math.min(this.iCurrentEnd,this.iMaxLength)-this.iCurrentBegin;if(this.iCurrentBegin===-1){g=this.aContexts.slice(0,this.iCurrentBegin+l);g.unshift(this.aContexts[-1]);}else{g=this.aContexts.slice(this.iCurrentBegin,this.iCurrentBegin+l);}while(g.length<l){g.push(undefined);}return g;};f.prototype.getDiff=function(r,g){var D,n,t=this;n=r.map(function(E,i){return t.bDetectUpdates?JSON.stringify(E):t.aContexts[g+i].getPath();});D=q.sap.arraySymbolDiff(this.aPreviousData,n);this.aPreviousData=n;return D;};f.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues");};f.prototype.getHeaderContext=function(){return(this.bRelative&&!this.oContext)?null:this.oHeaderContext;};f.prototype.getLength=function(){var l=this.bLengthFinal?this.iMaxLength:this.aContexts.length+10;if(this.aContexts[-1]){l+=1;}return l;};f.prototype.getOrderby=function(o){var g=[],t=this;this.aSorters.forEach(function(h){if(h instanceof b){g.push(h.sPath+(h.bDescending?" desc":""));}else{throw new Error("Unsupported sorter: "+h+" - "+t);}});if(o){g.push(o);}return g.join(',');};f.prototype.isLengthFinal=function(){return this.bLengthFinal;};f.prototype.mergeQueryOptions=function(Q,o,g){var r;function h(p,v){if(v&&(!Q||Q[p]!==v)){if(!r){r=Q?JSON.parse(JSON.stringify(Q)):{};}r[p]=v;}}h("$orderby",o);h("$filter",g);return r||Q;};f.prototype.refreshInternal=function(g){var t=this;this.sRefreshGroupId=g;this.oCachePromise.then(function(o){if(o){t.mCacheByContext=undefined;t.fetchCache(t.oContext);}t.reset(C.Refresh);t.oModel.getDependentBindings(t).forEach(function(D){D.refreshInternal(g,false);});});};f.prototype.refreshSingle=function(o,g){var t=this;this.oModel.checkGroupId(g);if(!this.isRefreshable()){throw new Error("Binding is not refreshable; cannot refresh entity: "+o);}if(this.hasPendingChangesForPath(o.getPath())){throw new Error("Cannot refresh entity due to pending changes: "+o);}return this.oCachePromise.then(function(h){var D=false,p;function i(j){if(D){t.fireDataReceived(j);}}g=g||t.getGroupId();p=h.refreshSingle(g,o.iIndex,function(){D=true;t.fireDataRequested();}).then(function(){i({data:{}});o.checkUpdate();},function(E){i({error:E});throw E;})["catch"](function(E){t.oModel.reportError("Failed to refresh entity: "+o,s,E);});t.oModel.getDependentBindings(o).forEach(function(j){j.refreshInternal(g,false);});return p;});};f.prototype.reset=function(g){var E=this.iCurrentEnd===0,t=this;if(this.aContexts){this.aContexts.forEach(function(o){t.mPreviousContextsByPath[o.getPath()]=o;});if(this.aContexts[-1]){this.aContexts[-1].destroy();}}this.aContexts=[];this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;if(g&&!(E&&g===C.Change)){this.sChangeReason=g;this._fireRefresh({reason:g});}if(this.getHeaderContext()){this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(o){o.checkUpdate();});}};f.prototype.resumeInternal=function(){this.reset();this.fetchCache(this.oContext);this.oModel.getDependentBindings(this).forEach(function(D){D.resumeInternal(false);});this._fireChange({reason:C.Change});};f.prototype.setContext=function(o){var r;if(this.oContext!==o){if(this.bRelative){if(this.aContexts&&this.aContexts[-1]&&this.aContexts[-1].isTransient()){throw new Error("setContext on relative binding is forbidden if a transient "+"entity exists: "+this);}this.reset();this.fetchCache(o);if(o){r=this.oModel.resolve(this.sPath,o);if(this.oHeaderContext&&this.oHeaderContext.getPath()!==r){this.oHeaderContext.destroy();this.oHeaderContext=null;}if(!this.oHeaderContext){this.oHeaderContext=c.create(this.oModel,this,r);}}B.prototype.setContext.call(this,o);}else{this.oContext=o;}}};f.prototype.sort=function(v){this.checkSuspended();if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes");}this.aSorters=d.toArray(v);this.mCacheByContext=undefined;this.fetchCache(this.oContext);this.reset(C.Sort);return this;};f.prototype.toString=function(){return s+": "+(this.bRelative?this.oContext+"|":"")+this.sPath;};f.prototype.updateAnalyticalInfo=function(g){var A=[],G=[],h=[];g.forEach(function(o){if("total"in o){if("grouped"in o){throw new Error("Both dimension and measure: "+o.name);}A.push(o.name);}else if("grouped"in o){if(o.inResult||o.visible){G.push(o.name);}}else{h.push(o.name);}});this.changeParameters({$apply:"groupby(("+G.concat(h).join(",")+(A.length?"),aggregate("+A.join(",")+"))":"))")});};return f;});