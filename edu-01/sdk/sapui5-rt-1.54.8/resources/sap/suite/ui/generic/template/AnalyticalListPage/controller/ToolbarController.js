sap.ui.define(["sap/m/SegmentedButtonItem","sap/m/Button","sap/m/ButtonType","sap/ui/base/EventProvider","sap/m/SegmentedButton","sap/ui/core/mvc/Controller"],function(S,B,a,E,b,C){"use strict";var c="table",d="chart",e="charttable",f="customview1",g="customview2";var t=C.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.ToolbarController",{setState:function(s){var m=this;m.oState=s;m._uiCompRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var h=s.oController.getOwnerComponent().getDefaultContentView();m.oState._pendingTableToolbarInit=true;m.oState._pendingChartToolbarInit=true;if(!m.oState.alr_viewSwitchButtonOnChart||!m.oState.alr_viewSwitchButtonOnTable){m.oState.alr_viewSwitchButtonOnChart=m.createViewSwitchButton(true);m.oState.alr_viewSwitchButtonOnTable=m.createViewSwitchButton(false);}var T=m.oState.oController.getOwnerComponent().getModel("_templPriv");h=(!T.getProperty('/alp/visibility/hybridView')&&h==="charttable")?"chart":h;T.setProperty('/alp/contentView',h);},createViewSwitchButton:function(h){var o=this.oState.oController.oView.getModel("alpCustomModel");var i=[];if(sap.ui.Device.system.desktop){i.push(new sap.m.SegmentedButtonItem({tooltip:"{i18n>CONTAINER_VIEW_CHARTTABLE}",key:e,icon:o.getProperty("/icon/hybrid")}));}if(o.getProperty("/required/master")){i.push(new sap.m.SegmentedButtonItem({tooltip:"{i18n>CONTAINER_VIEW_CHART}",key:d,icon:o.getProperty("/icon/master")}));}if(this.oState.bCustomView1Exist){i.push(new sap.m.SegmentedButtonItem({tooltip:o.getProperty("/tooltip/customview1"),key:f,icon:o.getProperty("/icon/customview1")}));}if(this.oState.bCustomView2Exist){i.push(new sap.m.SegmentedButtonItem({tooltip:o.getProperty("/tooltip/customview2"),key:g,icon:o.getProperty("/icon/customview2")}));}i.push(new sap.m.SegmentedButtonItem({tooltip:"{i18n>CONTAINER_VIEW_TABLE}",key:c,icon:"sap-icon://table-view"}));var j={select:jQuery.proxy(function(){this.oState.oController._templateEventHandlers.onSegmentButtonPressed(!this.oState.oController.getOwnerComponent().getProperty('smartVariantManagement'));},this),layoutData:new sap.m.OverflowToolbarLayoutData({priority:sap.m.OverflowToolbarPriority.NeverOverflow}),items:i,selectedKey:"{_templPriv>/alp/contentView}"};if(h){jQuery.extend(j,{visible:"{= (${_templPriv>/alp/contentView} === 'chart' || ${_templPriv>/alp/contentView} === 'charttable') && !${_templPriv>/alp/fullScreen} }"});var s=new b(j);}else{jQuery.extend(j,{visible:"{= (${_templPriv>/alp/contentView} === 'table' ) && !${_templPriv>/alp/fullScreen} }"});var s=new b(j);}return s;}});return t;});