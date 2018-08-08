sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/generic/app/navigation/service/NavError","sap/ui/generic/app/navigation/service/SelectionVariant","sap/ui/comp/state/UIState"],function(q,B,N,S,U){"use strict";var d="sap.suite.ui.generic.template.customData",a="sap.suite.ui.generic.template.genericData";var I=["INIT","DATA_SUITE","CANCEL","RESET","SET_VM_ID"];function n(o){if(o){for(var p in o){o[p]=null;}}}function f(o,O){var k=Object.keys(o);if(k.length!==Object.keys(O).length){return true;}for(var i=0;i<k.length;i++){var K=k[i];var p=o[K];var P=O[K];if(p.length!==P.length){return true;}for(var j=0;j<p.length;j++){if(p[j]!==P[j]){return true;}}}return false;}function g(s,c,t){var o=t.oCommonUtils.getNavigationHandler();var b=c.getOwnerComponent().getSmartVariantManagement();var r={appStateKey:"",urlParams:{},selectionVariant:"",tableVariantId:""};var e=false;var h=null;var A=Promise.resolve();var D=false;var j=false;var E=c.byId("editStateFilter");var k;var l=null;var m=null;s.oSmartFilterbar.setSuppressSelection(true);var p=(function(){var i;return function(){i=i||s.oSmartFilterbar.getNonVisibleCustomFilterNames();return i;};})();function u(){return D;}function v(){var Y={};Y[d]={};var Z=[];var $=p();for(var i=0;i<$.length;i++){var _=$[i];if(s.oSmartFilterbar.isVisibleInFilterBarByName(_)){Z.push(_);}}Y[a]={suppressDataSelection:!D,visibleCustomFields:Z};if(E){Y[a].editStateFilter=E.getSelectedKey();}var a1=s.oMultipleViewsHandler&&s.oMultipleViewsHandler.getContentForIappState();if(a1){var b1=a1.mode==="single"?"tableViewData":"tableTabData";Y[a][b1]=a1.state;}if(s.oWorklistData.bWorkListEnabled){var c1=s.oWorklistData.oSearchField?s.oWorklistData.oSearchField.getValue():"";var d1={"searchString":c1};Y[a]["Worklist"]=d1;}c.getCustomAppStateDataExtension(Y[d]);return Y;}function w(){var Y=JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant());var Z=new S(Y);var $=c.getVisibleSelectionsWithDefaults();for(var i=0;i<$.length;i++){if(!Z.getValue($[i])){Z.addSelectOption($[i],"I","EQ","");}}if(c.byId('template::PageVariant')&&c.byId('template::PageVariant').currentVariantGetModified()&&Z.getID()){Z.setID("");}if(s.oWorklistData.bWorkListEnabled){var _=s.oWorklistData.oSearchField?s.oWorklistData.oSearchField.getValue():"";Z.addSelectOption("Worklist.SearchField","I","EQ",_);}var a1={selectionVariant:Z.toJSONString(),tableVariantId:(!b&&s.oSmartTable.getCurrentVariantId())||"",customData:v()};return a1;}function x(){if(!j){return;}j=false;try{l=o.storeInnerAppStateWithImmediateReturn(w(),true);}catch(i){q.sap.log.error("ListReport.fnStoreCurrentAppStateAndAdjustURL: "+i);return;}if(l instanceof N){j=true;l=null;return;}l.promise.fail(function(Y){q.sap.log.error("ListReport.fnStoreCurrentAppStateAndAdjustURL: Error when persisting appState"+Y);});if(m===l.appStateKey){l=null;}else{o.replaceHash(l.appStateKey);}}function R(Y,Z){if(Y&&Y.editStateFilter!==undefined){if(E){E.setSelectedKey((Y.editStateFilter===null)?0:Y.editStateFilter);}}var $=Y&&Y.visibleCustomFields;if($&&$.length>0){var _=s.oSmartFilterbar.getAllFilterItems();for(var i=0;i<_.length;i++){var a1=_[i];var b1=a1.getName();if($.indexOf(b1)!==-1){a1.setVisibleInFilterBar(true);}}}D=Z&&!(Y&&Y.suppressDataSelection);if(D&&!s.oWorklistData.bWorkListEnabled){s.oSmartFilterbar.search();V(D);}}function y(i){c.restoreCustomAppStateDataExtension(i||{});}function z(i,Y){i=i||{};if(i.hasOwnProperty(d)&&i.hasOwnProperty(a)){y(i[d]);R(i[a],Y);}else{if(i._editStateFilter!==undefined){R({editStateFilter:i._editStateFilter});delete i._editStateFilter;}y(i);}}function C(){return A.then(function(){if(r.appStateKey){return{"sap-iapp-state":[r.appStateKey]};}return r.urlParams;});}function F(i){var Y=t.oComponentUtils.getTemplatePrivateModel();Y.setProperty("/generic/bDataAreShownInTable",i);}function G(i,Y){F(Y);if(e){return;}if(i||Y!==D){D=Y;if(!j){j=true;if(!s.oSmartFilterbar.isDialogOpen()){if(h){x();}else{setTimeout(x,0);}}}}}function H(Y,Z,$){s.oSmartFilterbar.setSuppressSelection(false);s.sNavType=$;var _=Y.appStateKey||"";if(e){return;}if(m===null){m=_;}else if(_!==m){return;}e=true;var a1=Y.selectionVariant||"";var b1=(!b&&Y.tableVariantId)||"";var c1=(!_&&Z)||{};if((r.appStateKey!==_||r.selectionVariant!==a1||r.tableVariantId!==b1||f(r.urlParams,c1))&&$!==sap.ui.generic.app.navigation.service.NavType.initial){if(!l||l.appStateKey!==_){var d1=Y&&Y.bNavSelVarHasDefaultsOnly;if(!s.oWorklistData.bWorkListEnabled){if(Y.oSelectionVariant&&r.selectionVariant!==a1){var e1=Y.oSelectionVariant.getParameterNames().concat(Y.oSelectionVariant.getSelectOptionsPropertyNames());for(var i=0;i<e1.length;i++){s.oSmartFilterbar.addFieldToAdvancedArea(e1[i]);}}var f1=new U({selectionVariant:Y.oSelectionVariant.toJSONObject()});Y.oUiState=f1;if(d1&&s.oSmartFilterbar.isCurrentVariantStandard()){s.oSmartFilterbar.setUiState(f1,{replace:false,strictMode:false});}else if(!d1||s.oSmartFilterbar.isCurrentVariantStandard()){s.oSmartFilterbar.clearVariantSelection();s.oSmartFilterbar.clear();s.oSmartFilterbar.setUiState(f1,{replace:true,strictMode:false});}}if(b1!==r.tableVariantId){s.oSmartTable.setCurrentVariantId(b1);}Y.customData=Y.customData||{};var g1=s.oMultipleViewsHandler&&s.oMultipleViewsHandler.getMode();if(g1){var h1=g1==="single"?"tableViewData":"tableTabData";if(Y.customData[a]&&Y.customData[a][h1]){s.oMultipleViewsHandler.restoreFromIappState(Y.customData[a][h1]);}}if(s.oWorklistData.bWorkListEnabled){s.oWorklistData.oWorklistSavedData=Y.customData[a]["Worklist"];W();}z(Y.customData,true);}r={appStateKey:_,urlParams:c1,selectionVariant:a1,tableVariantId:b1};}if(h){h();h=null;}if($!==sap.ui.generic.app.navigation.service.NavType.iAppState&&!D){var i1=($===sap.ui.generic.app.navigation.service.NavType.xAppState||$===sap.ui.generic.app.navigation.service.NavType.URLParams)&&!Y.bNavSelVarHasDefaultsOnly;D=i1||s.bLoadListAndFirstEntryOnStartup||k||s.oSmartFilterbar.isCurrentVariantExecuteOnSelectEnabled();F(D);if(D){s.oSmartFilterbar.search();V(D);}}if($==="initial"&&s.oWorklistData.bWorkListEnabled){if(s.oSmartFilterbar.isCurrentVariantStandard()){W();}}l=null;e=false;}function P(){if(!h){A=new Promise(function(Y){h=Y;});}var i=new Promise(function(Y,Z){var $=o.parseNavigation();$.done(function(_,a1,b1){H(_,a1,b1);Y();});$.fail(function(_,a1,b1){q.sap.log.warning(_.getErrorCode(),"app state could not be parsed - continuing with empty state","sap.suite.ui.generic.template.ListReport.controller.IappStateHandler");H({},a1,b1);Y();});});return i;}function J(){var i=w();s.oSmartFilterbar.setFilterData({_CUSTOM:i.customData});}function K(){G(true,D);}function L(i){var Y=i.getParameter("context");var Z=s.oSmartFilterbar.getFilterData();if(Z._CUSTOM!==undefined){if(s.oWorklistData.bWorkListEnabled){var $=Z._CUSTOM[a]["Worklist"];s.oSmartFilterbar.setSuppressSelection(false);s.oWorklistData.oSearchField.setValue($.searchString);s.oWorklistData.oSearchField.fireSearch();}else{z(Z._CUSTOM);}}else{var _=v();n(_[d]);n(_[a]);z(_);}if(I.indexOf(Y)<0){D=i.getParameter("executeOnSelect");G(true,D);}}function M(){if(!b){G(true,D);}}function O(){if(!b){G(true,D);}}function Q(i){var Y=i.getParameter("arguments");var Z=Y&&Y["?query"];m=(Z&&Z["sap-iapp-state"])||"";if(l){if(l.appStateKey!==m){q.sap.log.error("ListReport.fnStoreCurrentAppStateAndAdjustURL: Got AppstateKey "+m+" expected "+l.appStateKey);return false;}P();return true;}return false;}function T(){k=s.oSmartTable.getEnableAutoBinding();s.oSmartFilterbar.attachFiltersDialogClosed(x);}function V(D){if(c&&c.getOwnerComponent&&c.getOwnerComponent().getModel){var i=c.getOwnerComponent().getModel("_templPriv");if(D){i.setProperty("/listReport/isHeaderExpanded",false);}else{i.setProperty("/listReport/isHeaderExpanded",true);}}}function W(){var i=s.oWorklistData.oWorklistSavedData?s.oWorklistData.oWorklistSavedData:{};if(s.sNavType==="initial"){s.oSmartFilterbar.setSuppressSelection(false);}if(i.searchString){X();s.oWorklistData.oSearchField.setValue(i.searchString);s.oWorklistData.bVariantDirty=false;s.oWorklistData.oSearchField.fireSearch();return;}s.oSmartFilterbar.search();s.oIappStateHandler.changeIappState(true,true);}function X(){var i=s.oSmartTable;var Y=i.getCustomToolbar().getContent();for(var Z in Y){if(Y[Z].getId().indexOf("SearchField")>-1){s.oWorklistData.oSearchField=Y[Z];break;}}}s.getCurrentAppState=w;return{areDataShownInTable:u,parseUrlAndApplyAppState:P,getUrlParameterInfo:C,changeIappState:G,onSmartFilterBarInitialise:T,onBeforeSFBVariantFetch:J,onAfterSFBVariantSave:K,onAfterSFBVariantLoad:L,onAfterTableVariantSave:M,onAfterApplyTableVariant:O,isStateChange:Q,fetchAndSaveWorklistSearchField:X};}return B.extend("sap.suite.ui.generic.template.ListReport.controller.IappStateHandler",{constructor:function(s,c,t){q.extend(this,g(s,c,t));}});});