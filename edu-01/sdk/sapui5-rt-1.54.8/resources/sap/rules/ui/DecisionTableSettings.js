/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/rules/ui/library","sap/ui/core/Control","sap/ui/layout/form/SimpleForm","sap/m/Label","sap/m/Switch","sap/m/Select","sap/m/MessageBox","sap/m/Table","sap/m/Text","sap/m/CheckBox","sap/m/Input","sap/m/Button","sap/rules/ui/ExpressionAdvanced","sap/ui/layout/VerticalLayout","sap/rules/ui/type/Expression","sap/rules/ui/Constants"],function(q,l,C,S,L,a,b,M,T,c,d,I,B,E,V,f,g){"use strict";var D=C.extend("sap.rules.ui.DecisionTableSettings",{metadata:{library:"sap.rules.ui",properties:{cellFormat:{type:"sap.rules.ui.DecisionTableCellFormat",defaultValue:sap.rules.ui.DecisionTableCellFormat.Both},hitPolicies:{type:"sap.rules.ui.RuleHitPolicy[]",defaultValue:[sap.rules.ui.RuleHitPolicy.FirstMatch,sap.rules.ui.RuleHitPolicy.AllMatch]},modelName:{type:"string",defaultValue:""},newDecisionTable:{type:"boolean",defaultValue:false},decisionTableFormat:{type:"sap.rules.ui.DecisionTableFormat",defaultValue:sap.rules.ui.DecisionTableFormat.CellFormat}},aggregations:{mainLayout:{type:"sap.ui.layout.form.SimpleForm",multiple:false}},defaultAggregation:"mainLayout",associations:{expressionLanguage:{type:"sap.rules.ui.services.ExpressionLanguage",multiple:false,singularName:"expressionLanguage"}},events:{},publicMethods:[]}});sap.rules.ui.DecisionTableSettings.prototype.init=function(){this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this.editableModeText=g.EDITABLE;this.hiddenModeText=g.HIDDEN;this.needCreateLayout=true;this.firstLoad=true;this.resultCounter=0;this.enableAccessValue=false;this.onsapescape=function(e){e.stopPropagation();};this._decisionTableHeaderSettingFormatter=new f();this.setBusyIndicatorDelay(0);this._destroyElement("idColAccessTable");this._destroyElement("id_HiddenAccessMessageStrip");this._destroyElement("id_EditableAccessMessageStrip");};sap.rules.ui.DecisionTableSettings.prototype._destroyElement=function(e){var h=sap.ui.getCore().byId(e);if(h){if(e==="idColAccessTable"){h.destroyColumns();}h.destroy();}};sap.rules.ui.DecisionTableSettings.prototype.onBeforeRendering=function(){this.mNextColumnId=this._calcNextColumnId();if(this.firstLoad){this._initSettingsModel();if(this.getProperty("newDecisionTable")===true){this.mNextColumnId=1;this._prepareNewRule();}this.firstLoad=false;}if(this.needCreateLayout){var e=this.getAggregation("mainLayout");if(e){e.destroy();}e=this._createLayout();this.setAggregation("mainLayout",e,true);this.needCreateLayout=false;this.conditionsTable.getBinding("items").attachDataRequested(function(){this.setBusy(true);}.bind(this));this.conditionsTable.getBinding("items").attachDataReceived(function(){this.setBusy(false);}.bind(this));}};sap.rules.ui.DecisionTableSettings.prototype._setDefaultResult=function(){var _=this.getModel();var m=_.getData();var r=this._internalModel.getData().results.resultsEnumration;if(r.length===2){m.ResultDataObjectId=r[1].id;m.ResultDataObjectName=r[1].name;m.ResultDataObjectStatus="C";}};sap.rules.ui.DecisionTableSettings.prototype._createDefaultColumn=function(){var _=this.getModel();var m=_.getData();m.DecisionTable.DecisionTableColumns.results.push({Condition:{Expression:"",FixedOperator:"",Id:this.mNextColumnId++,RuleId:m.Id,Version:m.Version,ValueOnly:this._getCellFormat()},Id:1,Sequence:1,Type:sap.rules.ui.DecisionTableColumn.Condition,Status:"C"});};sap.rules.ui.DecisionTableSettings.prototype._updateDecisionTableHeader=function(){var _=this.getModel();var e=sap.ui.getCore().byId(this.getExpressionLanguage());var s=e.getExpressionLanguageVersion();var m=_.getData();m.Type=sap.rules.ui.RuleType.DecisionTable;m.ExpressionLanguageVersion=s;};sap.rules.ui.DecisionTableSettings.prototype._prepareNewRule=function(){this._updateDecisionTableHeader();this._createDefaultColumn();this._setDefaultResult();};sap.rules.ui.DecisionTableSettings.prototype._createTable=function(){this.conditionsTable=new T({backgroundDesign:sap.m.BackgroundDesign.Solid,showSeparators:sap.m.ListSeparators.None,fixedLayout:true,layoutData:new sap.ui.layout.form.GridContainerData({halfGrid:false}),columns:[new sap.m.Column({width:"50%",header:new sap.m.Label({text:this.oBundle.getText("colOfDecisionTable"),design:sap.m.LabelDesign.Bold}).setTooltip(this.oBundle.getText("colOfDecisionTable"))}),new sap.m.Column({width:"25%",header:new sap.m.Label({text:this.oBundle.getText("fixedOperator"),design:sap.m.LabelDesign.Bold}).setTooltip(this.oBundle.getText("fixedOperator"))}),new sap.m.Column({width:"20%"})]}).data("hrf-id","columnsTable",true);var _=this.getModel();this.conditionsTable.setModel(_);this.conditionsTable.bindItems({path:"/DecisionTable/DecisionTableColumns/results",factory:this._tableColumnsFactory.bind(this)});this.conditionsTable.setBusyIndicatorDelay(0);return this.conditionsTable;};sap.rules.ui.DecisionTableSettings.prototype._ruleResultColumns=function(){var e=this.getModel().oData.DecisionTable.DecisionTableColumns.results;function i(h){return h.Result!=null;}return e.filter(i);};sap.rules.ui.DecisionTableSettings.prototype._getResultsUpdates=function(r,e){var h=[],k=[],m=[];var i=0,j=0;for(i=0;i<r.length;i++){var n=false;for(j=0;j<e.length;j++){if(e[j].name===r[i].Result.DataObjectAttributeName){n=true;if((e[j].businessDataType!==r[i].Result.BusinessDataType)||(e[j].name!==r[i].Result.DataObjectAttributeName)){m.push(r[i].Result.DataObjectAttributeName);}}}if(!n){k.push(r[i].Result.DataObjectAttributeName);}n=false;}for(j=0;j<e.length;j++){var o=false;for(i=0;i<r.length;i++){if(e[j].name===r[i].Result.DataObjectAttributeName){o=true;}}if(!o){h.push(e[j].name);}o=false;}return{addedColumns:h,changedColumns:m,removedColumns:k};};sap.rules.ui.DecisionTableSettings.prototype._updateRefreshFlags=function(n,i){this.getModel().getData().needToRefresh=n;this.getModel("settingsModel").setProperty("/refreshButtonEnabled",i,null,true);this.getModel("settingsModel").setProperty("/refreshButtonClicked",true);this._callRefreshResultsFunctionImport();};sap.rules.ui.DecisionTableSettings.prototype._callRefreshResultsFunctionImport=function(){var t=this;var o=this.getModel("oDataModel");var m=this.getModel().getData();var h={groupId:"changes"};o.setDeferredGroups([h.groupId]);var s=function(r){var e=o.sServiceUrl;var n=false;var k=e.search("/rules-service/rule_srv");if(k>=0){n=true;}if(n){t._createPredefinedResultsTable();}t.getModel().getData().needToRefresh=false;};var i=function(e){sap.m.MessageToast.show(e);};var j=function(r){var R=m.Id;o.callFunction("/RefreshRuleResultDataObject",{method:"POST",groupId:h.groupId,urlParameters:{RuleId:R}});o.submitChanges({groupId:h.groupId,success:s,error:i});};if(m.needToRefresh){j();}};sap.rules.ui.DecisionTableSettings.prototype._getMessageByResultUpdates=function(r){var m=this.oBundle.getText("refreshingWillDeleteMsg");var e=this.oBundle.getText("refreshAreyouSureMsg");var h=r.addedColumns.length+r.changedColumns.length+r.removedColumns.length;if(h!=0){var i=function(s){return"'"+s+"'";};var j=(r.addedColumns.length==0)?"":this.oBundle.getText("columnsWereAdded",r.addedColumns.map(i).toString());var k=(r.changedColumns.length==0)?"":this.oBundle.getText("columnsWereChanged",r.changedColumns.map(i).toString());var n=(r.removedColumns.length==0)?"":this.oBundle.getText("columnsWereRemoved",r.removedColumns.map(i).toString());var o=j+k+n+((r.removedColumns.length==0)?"":m)+e;this.getModel("settingsModel").setProperty("/refreshButtonEnabled",true,null,true);return o;}else{this.getModel("settingsModel").setProperty("/refreshButtonEnabled",false,null,true);}return null;};sap.rules.ui.DecisionTableSettings.prototype._createRefreshButton=function(){var _=function(){var k=this.getModel("settingsModel").oData.results.resultsEnumration;var m=this.getModel().oData.ResultDataObjectId;var n=[];var o=false;if(m){for(var i=0;i<k.length;i++){if(k[i].id===m){if(k[i].columns){n=k[i].columns;o=true;break;}else{this.getModel("settingsModel").setProperty("/refreshButtonEnabled",true,null,true);o=true;var p=this.oBundle.getText("refreshingWillDeleteMsg");var s=this.oBundle.getText("refreshAreyouSureMsg");return p+s;}}}if(!o){n=null;}if(n&&n.length>0){var t=this._ruleResultColumns();var u=this._getResultsUpdates(t,n);return this._getMessageByResultUpdates(u);}}this.getModel("settingsModel").setProperty("/refreshButtonEnabled",false,null,true);return null;}.bind(this);var e=function(){this._updateRefreshFlags(true,false);}.bind(this);var h=_();var j=function(){var i=h;M.warning(i,{title:this.oBundle.getText("refeshResultWarningTitle"),actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],onClose:function(A){if(A===sap.m.MessageBox.Action.OK){e();}}});}.bind(this);var r=new B({layoutData:new sap.ui.layout.ResponsiveFlowLayoutData({weight:1}),icon:sap.ui.core.IconPool.getIconURI("synchronize"),width:"3rem",type:sap.m.ButtonType.Transparent,text:"",press:j,visible:true,enabled:"{settingsModel>/refreshButtonEnabled}"}).setTooltip(this.oBundle.getText("refreshBtn"));this.refreshButton=r;return r;};sap.rules.ui.DecisionTableSettings.prototype._createResultInput=function(){var m=this.getModel();var r=m.oData.ResultDataObjectId;var s=this.getModel("settingsModel");var e=s.oData.results.resultsEnumration;if(r!==g.NO_RESULT||r!==""){e.splice(0,1);s.oData.results.resultsEnumration=e;}this.oResultInput=new I({width:"220px",valueHelpOnly:true,showValueHelp:true,selectedKey:"{/ResultDataObjectId}",value:"{/ResultDataObjectName}",suggestionItems:{path:"settingsModel>/results/resultsEnumration",template:new sap.ui.core.Item({key:"{settingsModel>id}",text:"{settingsModel>name}"})},valueHelpRequest:function(o){var i=o.getSource();var _=this.getModel();var h=_.getData();var j=function(){var n=function n(p){var v=p.getParameter("value");var F=new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,v);p.getSource().getBinding("items").filter([F]);};this.oSelectDialog=new sap.m.SelectDialog({title:this.oBundle.getText("chooseResultDialogTitle"),styleClass:"sapUiPopupWithPadding",rememberSelections:true,items:{path:"settingsModel>/results/resultsEnumration",template:new sap.m.StandardListItem({title:"{settingsModel>name}",description:"{settingsModel>description}"})},search:n,liveChange:n,confirm:function(p){var t=p.getParameter("selectedItem");var u=p.getParameter("selectedContexts");if(t){var v=u[0].getProperty().id;i.setSelectedKey(v);var w=this.getModel("settingsModel");w.setProperty("/resultDataObjectChanged",true);w.setProperty("/newResultDataObjectID",v);w.oData.predefinedResults=[];this._createPredefinedResultsLayout();if(!h.ResultDataObjectStatus){h.ResultDataObjectStatus="U";if(h.ResultDataObjectId!=t.getInfo()){this._updateRefreshFlags(false,false);}}}p.getSource().getBinding("items").filter([]);if(this.oSelectDialog&&this.oSelectDialog._oDialog){this.oSelectDialog._oDialog.destroy();this.oSelectDialog=null;}}.bind(this),cancel:function(p){if(this.oSelectDialog&&this.oSelectDialog._oDialog){this.oSelectDialog._oDialog.destroy();this.oSelectDialog=null;}this.oSelectDialog=null;}.bind(this)});this.oSelectDialog.setModel(this.oResultInput.getModel("settingsModel"),"settingsModel");this.oSelectDialog.open();}.bind(this);function k(){M.warning(this.oBundle.getText("changeResultWarningMsg"),{title:this.oBundle.getText("changeResultWarningTitle"),actions:[sap.m.MessageBox.Action.OK,sap.m.MessageBox.Action.CANCEL],onClose:function(A){if(A===sap.m.MessageBox.Action.OK){j();}}});}if(h.ResultDataObjectStatus){j();}else if(this.getProperty("newDecisionTable")){h.ResultDataObjectStatus="C";j();}else{k.call(this);}}.bind(this)});return this.oResultInput;};sap.rules.ui.DecisionTableSettings.prototype._createLayout=function(){var F=new S({editable:true,layout:"ResponsiveGridLayout",maxContainerCols:1,columnsL:1,columnsM:1,labelSpanM:1,content:[new L({text:this.oBundle.getText("hitPolicy")}).setTooltip(this.oBundle.getText("hitPolicy")),new b({width:"220px",enabled:"{settingsModel>/hitPolicy/enabled}",items:{path:"settingsModel>/hitPolicy/hitPolicyEnumration",template:new sap.ui.core.Item({key:"{settingsModel>key}",text:"{settingsModel>text}"})},selectedKey:"{/DecisionTable/HitPolicy}",change:function(e){var _=this.getModel();var m=_.getData();if(m.DecisionTable.HitPolicyStatus!="C"){m.DecisionTable.HitPolicyStatus="U";}}.bind(this)}),new L(),new sap.ui.layout.HorizontalLayout({}),new L({text:this.oBundle.getText("conditionsTableLabelText")}).setTooltip(this.oBundle.getText("conditionsTableLabelTooltip")),this._createTable(),new L(),new sap.ui.layout.HorizontalLayout({}),new L({text:this.oBundle.getText("output")}).setTooltip(this.oBundle.getText("output")),new sap.ui.layout.HorizontalLayout({content:[this._createResultInput(),this._createRefreshButton()]}),new L(),this._createPredefinedResultsLayout()]}).addStyleClass("sapRULTDecisionTableSettingsForm");return F;};sap.rules.ui.DecisionTableSettings.prototype._createPredefinedResultsLayout=function(){var n=false;if(!n){var o=this.getModel("oDataModel");var s=o.sServiceUrl;var e=s.search("/rules-service/rule_srv");if(e>=0){n=true;}}if(n){var v=new sap.ui.layout.VerticalLayout({content:[this._createInfoMessageStrip(this.oBundle.getText("PredefinedMessageStripHiddenAccessInfoText"),"id_HiddenAccessMessageStrip"),this._createInfoMessageStrip(this.oBundle.getText("PredefinedMessageStripEditableAccessInfoText"),"id_EditableAccessMessageStrip"),this._createPredefinedResultsTable()]});return v;}else{return new L();}};sap.rules.ui.DecisionTableSettings.prototype._createInfoMessageStrip=function(t,e){var o=sap.ui.getCore().byId(e);if(!o){o=new sap.m.MessageStrip({visible:true,id:e,text:t,type:sap.ui.core.MessageType.Information,showIcon:true,showCloseButton:true}).addStyleClass("sapRULTDecisionTableSettingsMessageStrip");}return o;};sap.rules.ui.DecisionTableSettings.prototype._createPredefinedResultsTable=function(){if(!this.oColAccessTable){this.oColAccessTable=new sap.m.Table("idColAccessTable",{backgroundDesign:sap.m.BackgroundDesign.Solid,showSeparators:sap.m.ListSeparators.All,swipeDirection:sap.m.SwipeDirection.Both,fixedLayout:true,layoutData:new sap.ui.layout.form.GridContainerData({halfGrid:false}),columns:[new sap.m.Column({width:"45%",header:new sap.m.Label({text:this.oBundle.getText("PredefinedResultColumnHeaderText"),design:sap.m.LabelDesign.Bold})}),new sap.m.Column({width:"30%",header:new sap.m.Label({text:this.oBundle.getText("PredefinedAccessColumnHeaderText"),design:sap.m.LabelDesign.Bold})}),new sap.m.Column({width:"45%",header:new sap.m.Label({text:this.oBundle.getText("PredefinedValuesColumnHeaderText"),design:sap.m.LabelDesign.Bold})})]});}var r=this.getModel("settingsModel").getProperty("/resultDataObjectChanged");var R=this.getModel("settingsModel").getProperty("/refreshButtonClicked");var _=this.getModel();var e="";if(!r&&!R){this.oColAccessTable.setModel(_);this.oColAccessTable.bindItems({path:"/DecisionTable/DecisionTableColumns/results",factory:this._predefinedResultsFactory.bind(this)});this.oColAccessTable.setBusyIndicatorDelay(0);return this.oColAccessTable;}else{if(R){e=_.getData().ResultDataObjectId;}if(r){e=this.getModel("settingsModel").getProperty("/newResultDataObjectID");}this._getLatestResultDataObjects(e);}return null;};sap.rules.ui.DecisionTableSettings.prototype._updateResultAttributeJSON=function(o,r,A,e){var s=this.getModel("settingsModel");s.updateResultColCells=true;var h="";var p=o.getPath();var i="";if(r==="displayPredefinedResults"){i=p+"/Result/DataObjectAttributeId";var j=p+"/Result/AccessMode";var k=p+"/Result/Expression";h=o.getObject(i)?o.getObject(i):"";e=o.getObject(k)?o.getObject(k):"";A=o.getObject(j)?o.getObject(j):this.editableModeText;if(s.oData.predefinedResults[h]){s.oData.predefinedResults[h].AccessMode=A;s.oData.predefinedResults[h].Expression=e;}else{s.oData.predefinedResults[h]={};s.oData.predefinedResults[h].AccessMode=A;s.oData.predefinedResults[h].Expression=e;}}if(r==="updatePredefinedResults"){i=p+"/Result/DataObjectAttributeId";h=o.getObject(i)?o.getObject(i):o.getObject(o.sPath).Id;if(s.oData.predefinedResults[h]){if(A){s.oData.predefinedResults[h].AccessMode=A;}if(e||A===this.hiddenModeText){if(A===this.hiddenModeText){e="";}s.oData.predefinedResults[h].Expression=e;}if(e===""&&s.oData.predefinedResults[h].AccessMode===this.editableModeText){s.oData.predefinedResults[h].Expression=e;}}}if(r==="refreshAttributes"){var m=false;h=o.getProperty("DataObjectAttributeId")?o.getProperty("DataObjectAttributeId"):o.getProperty("Id");if(s.oData.predefinedResults){var P=s.oData.predefinedResults;for(var n in P){if(h===n){s.oData.predefinedResults[h].AttributeInBackend=true;m=true;break;}}if(!m){s.oData.predefinedResults[h]={};s.oData.predefinedResults[h].Expression="";s.oData.predefinedResults[h].AccessMode=this.editableModeText;s.oData.predefinedResults[h].AttributeInBackend=true;}}}if(r==="dataObjectChanged"){h=o.getProperty("DataObjectAttributeId")?o.getProperty("DataObjectAttributeId"):o.getProperty("Id");s.oData.predefinedResults[h]={};s.oData.predefinedResults[h].AccessMode=this.editableModeText;s.oData.predefinedResults[h].Expression="";}};sap.rules.ui.DecisionTableSettings.prototype._getLatestResultDataObjects=function(n){var t=this;var m=t.getModel().getData();var p=m.ProjectId;var v=m.Version;var o=t.getModel("oDataModel");var s=t.getModel("settingsModel");var e="/Projects(Id='"+p+"',Version='"+v+"')/DataObjects(Id='"+n+"',Version='"+v+"')/DataObjectAttributes";o.read(e,{success:function(r){s.updateResultColCells=true;t.oColAccessTable.setModel(o);t.oColAccessTable.bindItems({path:e,factory:t._predefinedResultsFactory.bind(t)});},error:function(h){M.error(t.oBundle.getText("ResultDataObjectsReadError"),{title:t.oBundle.getText("ResultDataObjectsMessageBoxText"),actions:[sap.m.MessageBox.Action.OK]});}});t.oColAccessTable.setBusyIndicatorDelay(0);return t.oColAccessTable;};sap.rules.ui.DecisionTableSettings.prototype._predefinedResultsFactory=function(i,o){var e=o.getProperty("Sequence")?o.getProperty("Sequence"):o.getObject(o.sPath).Name;var h="exp"+e;var t=o.getProperty("Type");var r=0;var _=this.getModel("settingsModel");var j=_.getProperty("/resultDataObjectChanged");var k=_.getProperty("/refreshButtonClicked");var m;var n="";var s="";var p="";var u="";if(!j&&!k){var v=o.getProperty("/DecisionTable/DecisionTableColumns/results");r=v.length;t=v[this.resultCounter].Type;if(t==="RESULT"&&r>0&&this.resultCounter<r){n=v[this.resultCounter].Result.DataObjectAttributeName;m=v[this.resultCounter].Result.BusinessDataType;p=v[this.resultCounter].Result.AccessMode?v[this.resultCounter].Result.AccessMode:"";if(p===this.editableModeText||p===null){s=g.KEY_EDITABLE;}else{s=g.KEY_HIDDEN;}u=v[this.resultCounter].Result.Expression?v[this.resultCounter].Result.Expression:"";this._updateResultAttributeJSON(o,"displayPredefinedResults",s,u);this.resultCounter++;}else{this.resultCounter++;return new sap.m.ColumnListItem({visible:false});}}if(_.getProperty("/resultDataObjectChanged")){this._updateResultAttributeJSON(o,"dataObjectChanged",this.editableModeText,"");m=o.getObject(o.sPath).BusinessDataType;n=o.getObject(o.sPath).Name;s=g.KEY_EDITABLE;u="";}if(_.getProperty("/refreshButtonClicked")){n=o.getObject(o.sPath).Name;m=o.getObject(o.sPath).BusinessDataType;var w=o.getObject(o.sPath).Id;var x=_.oData.predefinedResults[w];var y="";var z="";if(x){y=x.AccessMode;z=x.Expression;}if(y===this.editableModeText||y===""){y=g.KEY_EDITABLE;}else{y=g.KEY_HIDDEN;}s=y?y:g.KEY_EDITABLE;u=z?z:"";this._updateResultAttributeJSON(o,"refreshAttributes",s,u);}return new sap.m.ColumnListItem({visible:true,vAlign:sap.ui.core.VerticalAlign.Middle,cells:[new sap.m.Label({visible:true,design:sap.m.LabelDesign.Standard,text:n,textAlign:sap.ui.core.TextAlign.Begin,textDirection:sap.ui.core.TextDirection.Inherit}),new sap.m.Select({width:"65%",id:"select"+e,items:{path:"settingsModel>/accessOptions/cellFormatEnumration",template:new sap.ui.core.Item({key:"{settingsModel>key}",text:"{settingsModel>value}"})},selectedKey:s,enabled:true,change:function(A){this._setColumnAccessMode(o,A);}.bind(this)}),this._getPredefinedExpressionAdvanced(o,h,u,m)]});};sap.rules.ui.DecisionTableSettings.prototype._findAndRemoveDeletedAttributeFromOModel=function(){var _=this.getModel("settingsModel");var j=_.oData.predefinedResults;for(var e in j){var p=_.oData.predefinedResults;var t=[];var h="";if(!j[e].AttributeInBackend){h=e;for(var i in p){if(i===h){continue;}else{t[i]={};t[i].AccessMode=p[i].AccessMode;t[i].Expression=p[i].Expression;}}_.oData.predefinedResults=t;}var o=this.getModel();var k=o.oData.DecisionTable.DecisionTableColumns.results;for(var m=0;m<k.length;m++){if(k[m].Result&&k[m].Result.DataObjectAttributeId===h){this.sequenceOfAttributeDeleted=k[m].Sequence;this._removeColumnFromJsonModel(this.sequenceOfAttributeDeleted,"C");}}}};sap.rules.ui.DecisionTableSettings.prototype._getPredefinedExpressionAdvanced=function(o,e,h,i){var A="";if(o.getObject(o.sPath).Result&&!A){A=o.getObject(o.sPath).Result.DataObjectAttributeId;}if(o.getObject(o.sPath).Id&&!A){A=o.getObject(o.sPath).Id;}if(A){h=this.getModel("settingsModel").oData.predefinedResults[A].Expression;}var j=sap.ui.getCore().byId(this.getExpressionLanguage());var s=i?i:sap.rules.ui.ExpressionType.NonComparison;return new E({expressionLanguage:j,placeholder:this.oBundle.getText("expressionPlaceHolder"),validateOnLoad:true,id:e,type:s,value:h,editable:true,change:function(k){var m=k.getSource();var r=o.getPath().split("/")[1];o.oModel.oData[r].Expression=m.getValue();var n=o.oModel.oData[r].Expression;var p=o.oModel.oData[r].AccessMode;this.getModel("settingsModel").setProperty("/resultAttributeChanged",true);this._updateResultAttributeJSON(o,"updatePredefinedResults",p,n);}.bind(this)});};sap.rules.ui.DecisionTableSettings.prototype._setColumnAccessMode=function(o,e){this.enableAccessValue=!this.enableAccessValue;var h=e.oSource.sId.split("select")[1];var u="exp"+h;var i=sap.ui.getCore().byId(u);var s=e.getSource();var j=s.getSelectedKey();if(j===g.KEY_HIDDEN){i.enabled=true;i.setEditable(true);i.oTextArea.setValue("");i.setValueStateText(this.oBundle.getText("PredefinedResultsValueStateText"));i.removeStyleClass("sapRULExpressionAdvancedResultTable");this._updateResultAttributeJSON(o,"updatePredefinedResults",this.hiddenModeText,"");i._setEditorStyle();}else{i.enabled=true;i.setEditable(true);i.setValueStateText("");i.addStyleClass("sapRULExpressionAdvancedResultTable");var k=o.getObject(o.sPath);var r="";if(k&&k.Result){r=k.Result["Expression"];}this._updateResultAttributeJSON(o,"updatePredefinedResults",this.editableModeText,r);i._setEditorStyle();}};sap.rules.ui.DecisionTableSettings.prototype._getSelectedVisibilityStatus=function(A){if(A===this.hiddenModeText){return g.KEY_HIDDEN;}else{return g.KEY_EDITABLE;}};sap.rules.ui.DecisionTableSettings.prototype._getCellFormatAcccessOptions=function(){var s=this.getProperty("cellFormat");var o={CellFormat:s,cellFormatEnumration:[{key:g.KEY_EDITABLE,value:this.editableModeText},{key:g.KEY_HIDDEN,value:this.hiddenModeText}]};return o;};sap.rules.ui.DecisionTableSettings.prototype._getColumnInputMode=function(v){if(!v){return this.oBundle.getText("advancedMode");}return(this.oBundle.getText("valueOnly"));};sap.rules.ui.DecisionTableSettings.prototype._setExpressionRelevantOperators=function(e,h,v){var F=this._getFixedOperatorDataForExpression(e,v);this._internalModel.setProperty("/tableData/"+h,F,false);this._updateRemoveRowEnabled();};sap.rules.ui.DecisionTableSettings.prototype.setExpressionLanguage=function(e){this.setAssociation("expressionLanguage",e,true);this._decisionTableHeaderSettingFormatter.setExpressionLanguage(e);};sap.rules.ui.DecisionTableSettings.prototype._changeColumnInputMode=function(o,e){var s=e.getSource();this._openWarningDialog(s,o);};sap.rules.ui.DecisionTableSettings.prototype._changeInputMode=function(s,o,e){if(!s){o.setSelectedKey(this.oBundle.getText("valueOnly"));return;}o.setEnabled(false);this.getModel().setProperty(e.sPath+"/Condition/ValueOnly",false);this._changeColumnStatusToUpdate(e);};sap.rules.ui.DecisionTableSettings.prototype._changeColumnStatusToUpdate=function(o){var m=o.getModel();var s=o.getProperty("Status");if(!s||s!=="C"){m.setProperty(o.getPath()+"/Status","U");}};sap.rules.ui.DecisionTableSettings.prototype._getInputModeEnabled=function(s,v){if(s!==sap.rules.ui.DecisionTableCellFormat.Both||v===false){return false;}return true;};sap.rules.ui.DecisionTableSettings.prototype._getExpressionAdvanceColumn=function(o){var e=sap.ui.getCore().byId(this.getExpressionLanguage());return new E({expressionLanguage:e,placeholder:this.oBundle.getText("expressionPlaceHolder"),validateOnLoad:true,type:sap.rules.ui.ExpressionType.NonComparison,value:{path:"Condition/Expression",events:{change:function(h){var s=h.getSource();var i=s.getContext();var j=i.getProperty("Id");var v=i.getProperty("Condition/ValueOnly");this._setExpressionRelevantOperators(s.getValue(),j,v);}.bind(this)}},enabled:true,change:function(h){var s=h.getSource();var i=s.getBindingContext();var j=i.getProperty("Id");var m=i.getModel();var v=i.getProperty("Condition/ValueOnly");this._setExpressionRelevantOperators(s.getValue(),j,v);this._changeColumnStatusToUpdate(i);var k=i.getProperty("Condition/Expression");if(!k){m.setProperty(i.getPath()+"/Condition/FixedOperator","");}}.bind(this)});};sap.rules.ui.DecisionTableSettings.prototype._removeColumnFromJsonModel=function(s,e){var h=this.getModel();var m=h.getData();var j=m.DecisionTable.DecisionTableColumns.results;if(!e||e!=="C"){if(!m.DecisionTable.DecisionTableColumns.deleted){m.DecisionTable.DecisionTableColumns.deleted=[];}m.DecisionTable.DecisionTableColumns.deleted.push(j[s-1]);}j.splice(s-1,1);for(var i=s-1;i<j.length;i++){j[i].Sequence--;if(j[i].Status&&j[i].Status==="C"){continue;}j[i].Status="U";}this._setDisplayModelData(m);};sap.rules.ui.DecisionTableSettings.prototype._setDisplayModelData=function(m){this.resultCounter=0;var e=this.getModel();e.setData(m);};sap.rules.ui.DecisionTableSettings.prototype._getCellFormat=function(){var s=this.getProperty("cellFormat");var e=this.getProperty("decisionTableFormat");if(e===sap.rules.ui.DecisionTableFormat.RuleFormat){return(this.getModel().getData().RuleFormat===sap.rules.ui.RuleFormat.Basic)?true:false;}return(s!==sap.rules.ui.DecisionTableCellFormat.Text)?true:false;};sap.rules.ui.DecisionTableSettings.prototype._addColumnToJsonModel=function(s){var e=this.getModel();var m=e.getData();var h=e.oData.DecisionTable.DecisionTableColumns.results;var o={Condition:{Expression:"",FixedOperator:"",Id:this.mNextColumnId,RuleId:m.Id,ValueOnly:this._getCellFormat(),Version:m.Version},Id:this.mNextColumnId,RuleId:m.Id,Sequence:s+1,Type:sap.rules.ui.DecisionTableColumn.Condition,Version:m.Version,Status:"C"};this.mNextColumnId++;h.splice(s,0,o);for(var i=s+1;i<h.length;i++){h[i].Sequence=i+1;if(h[i].Status&&h[i].Status==="C"){continue;}h[i].Status="U";}this._setDisplayModelData(m);};sap.rules.ui.DecisionTableSettings.prototype._tableColumnsFactory=function(i,o){var e=o.getProperty("Id");var s=o.getProperty("Sequence");var h=o.getProperty("Status");var t=o.getProperty("Type");return new sap.m.ColumnListItem({visible:t===sap.rules.ui.DecisionTableColumn.Condition,cells:[this._getExpressionAdvanceColumn(o),new sap.m.Select({width:"100%",items:{path:"settingsModel>/tableData/"+e+"/fixOperatorEnumration",template:new sap.ui.core.Item({key:"{settingsModel>key}",text:"{settingsModel>value}"})},selectedKey:"{Condition/FixedOperator}",enabled:"{settingsModel>/tableData/"+e+"/fixOperatorEnabled}",change:function(j){this._changeColumnStatusToUpdate(o);}.bind(this)}),new sap.ui.layout.HorizontalLayout({content:[new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI("sys-cancel"),visible:"{settingsModel>/removeRowEnabled}",press:function(j){this._internalModel.setProperty("/tableData",{},true);this._removeColumnFromJsonModel(s,h);}.bind(this)}).setTooltip(this.oBundle.getText("removeColumn")),new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI("add"),press:function(j){this._addColumnToJsonModel(s);}.bind(this)}).setTooltip(this.oBundle.getText("addColumn"))],height:"1em"})]});};sap.rules.ui.DecisionTableSettings.prototype._openWarningDialog=function(s,o){var e=new sap.m.Dialog({title:this.oBundle.getText("changeInputModeDialogTitle"),width:"70%",type:'Message',state:'Warning',content:new c({text:this.oBundle.getText("changeInputModeDialogDescription")}),beginButton:new B({text:this.oBundle.getText("okBtn"),press:function(){e.close();e.destroy();this._changeInputMode(true,s,o);}.bind(this)}),endButton:new B({text:this.oBundle.getText("cancelBtn"),press:function(){e.close();e.destroy();this._changeInputMode(false,s,o);}.bind(this)}),afterClose:function(){e.close();e.destroy();}});e.open();};sap.rules.ui.DecisionTableSettings.prototype._getBindModelName=function(){var p="";var m=this.getModelName();if(m){p=m+">";}return p;};sap.rules.ui.DecisionTableSettings.prototype._getResultsData=function(){var e=sap.ui.getCore().byId(this.getExpressionLanguage());var r=[{id:g.NO_RESULT,name:""}];r=r.concat(e.getResults());var R={resultsEnumration:r};return R;};sap.rules.ui.DecisionTableSettings.prototype._initSettingsModel=function(){var i={};i.hitPolicy=this._getHitPoliciesData();i.tableData={};i.removeRowEnabled=false;i.cellFormat=this._getCellFormatData();i.accessOptions=this._getCellFormatAcccessOptions();i.updateAllRows=false;i.predefinedResults=[];i.results=this._getResultsData();this._internalModel=new sap.ui.model.json.JSONModel(i);this.setModel(this._internalModel,"settingsModel");};sap.rules.ui.DecisionTableSettings.prototype._calcNextColumnId=function(){var e=this.getModel();var m=e.getData();var h=m.DecisionTable.DecisionTableColumns.results;var j=0;for(var i=0;i<h.length;i++){if(h[i].Id>j){j=h[i].Id;}}var n=j+1;return n;};sap.rules.ui.DecisionTableSettings.prototype._getHitPoliciesData=function(){var h=this.getProperty("hitPolicies");var e=h.length;var H={hitPolicyEnumration:[]};for(var i=0;i<e;i++){H.hitPolicyEnumration.push({key:h[i],text:this.oBundle.getText(h[i])});}H.enabled=e>1?true:false;return H;};sap.rules.ui.DecisionTableSettings.prototype._getCellFormatData=function(){var s=this.getProperty("cellFormat");var o={CellFormat:s,cellFormatEnumration:[{key:this.oBundle.getText("advancedMode"),value:this.oBundle.getText("advancedMode")},{key:this.oBundle.getText("valueOnly"),value:this.oBundle.getText("valueOnly")}]};return o;};sap.rules.ui.DecisionTableSettings.prototype._getFixedOperatorDataForExpression=function(e,v){var h=e?true:false;var j={fixOperatorEnumration:[{key:"",value:"None"}],fixOperatorEnabled:h};if(h){var s=[];var o=sap.ui.getCore().byId(this.getExpressionLanguage());var F;if(!v){F=[{tokenType:sap.rules.ui.ExpressionTokenType.reservedWord,tokenCategory:sap.rules.ui.ExpressionCategory.comparisonOp},{tokenType:sap.rules.ui.ExpressionTokenType.reservedWord,tokenCategory:sap.rules.ui.ExpressionCategory.comparisonBetweenOp},{tokenType:sap.rules.ui.ExpressionTokenType.reservedWord,tokenCategory:sap.rules.ui.ExpressionCategory.comparisonExistOp}];}else{F=[{tokenType:sap.rules.ui.ExpressionTokenType.reservedWord,tokenCategory:sap.rules.ui.ExpressionCategory.comparisonOp},{tokenType:sap.rules.ui.ExpressionTokenType.reservedWord,tokenCategory:sap.rules.ui.ExpressionCategory.comparisonBetweenOp}];}s=o.getSuggestionsByCategories(e,F);for(var i=0;i<s.length;i++){j.fixOperatorEnumration.push({key:s[i].text,value:s[i].text});}}return j;};sap.rules.ui.DecisionTableSettings.prototype._updateRemoveRowEnabled=function(){var e=this.conditionsTable.getAggregation("items");var v=0;for(var i=0;i<e.length;i++){if(e[i].getVisible()===true){v++;}}var h=v>1;this._internalModel.setProperty("/removeRowEnabled",h,null,true);};sap.rules.ui.DecisionTableSettings.prototype.getButtons=function(o){var e=[];var h=new B({text:this.oBundle.getText("cancelBtn")}).setTooltip(this.oBundle.getText("cancelBtn"));h.attachPress(function(){o.close();},this);var A=new B({text:this.oBundle.getText("applyChangesBtn")}).setTooltip(this.oBundle.getText("applyChangesBtn"));A.attachPress(function(){this.multiHeaderFlag=false;this._applySettingsModelChangesToOData(o);},this);e.push(A);e.push(h);return e;};sap.rules.ui.DecisionTableSettings.prototype._applySettingsModelChangesToOData=function(o){var _=sap.ui.getCore().byId(this.getExpressionLanguage());var n=this.mNextColumnId;var e=this.getModel();var h=this.getModel("oDataModel");var s=this.getModel("settingsModel");var j=this.getBindingContext("dummy");var r=j.getProperty("Id");var v=j.getProperty("Version");var H=e.oData.DecisionTable.HitPolicy;var k={groupId:"changes"};var m=false;if(s.getProperty("/refreshButtonClicked")){this._findAndRemoveDeletedAttributeFromOModel();}var p=function(){var X={};X.groupId=k.groupId;var i={RuleId:r,Version:v,HitPolicy:H};var Y="/DecisionTables(Version='"+v+"',RuleId='"+r+"')";h.update(Y,i,X);};var t=function(i){var X={};var Y={RuleId:r,Version:v,Sequence:1,Id:1};X.properties=Y;h.createEntry("/DecisionTableRows",X);};var u=function(i){h.callFunction("/SetRuleResultDataObject",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r,ResultDataObjectId:(i!==g.NO_RESULT)?i:""}});};var w=function(i){var Y=s.oData.predefinedResults;if(Y){var Z;for(Z in Y){if(Z.AttributeId!=null||Z.AttributeId!==""){h.callFunction("/SetPredefinedResultAttributes",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r,DataObjectAttributeId:Z,AccessMode:Y[Z].AccessMode,Expression:Y[Z].Expression}});}}}if(!Y){m=false;}};var x=function(){h.callFunction("/RefreshRuleResultDataObject",{method:"POST",groupId:k.groupId,urlParameters:{RuleId:r}});};var y=function(i,Y){var X={};if(!Y.getProperty("DecisionTable")){var Z={RuleId:r,Version:v,HitPolicy:H};X.properties=Z;h.createEntry("/DecisionTables",X);}else{p();}t();};var z=function(i,Y){var X={};var Z={RuleId:i.RuleId,Version:i.Version,Id:i.Id,Type:sap.rules.ui.DecisionTableColumn.Condition,Sequence:Y};X.properties=Z;h.createEntry("/DecisionTableColumns",X);X.properties=i;h.createEntry("/DecisionTableColumnConditions",X);};var A=function(i){var Y="/DecisionTableColumns(RuleId='"+r+"',Version='"+v+"',Id="+i+")";h.remove(Y,k);};var F=function(O,P){var Y="/DecisionTableColumns(RuleId='"+r+"',Version='"+v+"',Id=ID_PROPERTY)";var Z="/DecisionTableColumnConditions(Version='"+v+"',RuleId='"+r+"',Id=ID_PROPERTY)";var $="/DecisionTableColumnResults(Version='"+v+"',RuleId='"+r+"',Id=ID_PROPERTY)";var a1;var Id="";var c1="";var d1={};for(var i=0;i<O.length;i++){a1=O[i];if(a1.Status){var e1;var f1;if(a1.Condition){e1=(a1.Condition.parserResults.converted&&a1.Condition.parserResults.converted.Expression)?a1.Condition.parserResults.converted.Expression:a1.Condition.Expression;f1=(a1.Condition.parserResults.converted&&a1.Condition.parserResults.converted.FixedOperator)?a1.Condition.parserResults.converted.FixedOperator:a1.Condition.FixedOperator;}m=true;if(a1.Result&&a1.Status==="U"){Id=a1.Id;c1=$.replace("ID_PROPERTY",Id);d1={Id:Id,Expression:a1.Result.Expression,AccessMode:a1.Result.AccessMode};h.update(c1,d1,k);}if(a1.Status==="U"){if(!(a1.Result&&P)){Id=a1.Id;var g1={Sequence:a1.Sequence};var h1=Y.replace("ID_PROPERTY",Id);h.update(h1,g1,k);}if(a1.Condition){c1=Z.replace("ID_PROPERTY",Id);var i1=a1.Condition.ValueOnly;d1={Id:Id,Expression:e1,FixedOperator:f1,ValueOnly:i1};h.update(c1,d1,k);}}else if(a1.Status==="C"){var j1=a1.Condition;j1.Expression=e1;j1.FixedOperator=f1;delete j1.parserResults;z(j1,a1.Sequence);}}}};var G=function(Y){if(!Y){return;}m=true;for(var i=0;i<Y.length;i++){var Z=Y[i];A(Z.Id);}};var J=function(i){var Y=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");var Z=false;var $=i.__batchResponses["0"].__changeResponses;for(var a1 in $){if($[a1].message){var b1=$[a1].response.body;M.error(b1,{title:Y.getText("RequestFailedText"),actions:[sap.m.MessageBox.Action.OK]});o.setState(sap.ui.core.ValueState.Error);Z=true;}}if(!Z||!m){o.setState(sap.ui.core.ValueState.Success);o.close();}};var K=function(Y){var X={};X.groupId=k.groupId;var Z=e.getData();var $=Z.ResultDataObjectName;var a1=_.getResultInfo($);var b1=a1?a1.requiredParams:[];var c1=b1.length;for(var i=0;i<c1;i++){var d1={RuleId:r,Version:v,Id:n,Type:sap.rules.ui.DecisionTableColumn.Result,Sequence:Y};X.properties=d1;h.createEntry("/DecisionTableColumns",X);var e1={RuleId:r,Version:v,Id:n,DataObjectAttributeName:b1[i].name,DataObjectAttributeId:b1[i].paramId,BusinessDataType:b1[i].businessDataType};n++;Y++;X.properties=e1;h.createEntry("/DecisionTableColumnResults",X);}};var N=_.convertRuleToCodeValues(e.oData);var O=N.output.decisionTableData.DecisionTable.DecisionTableColumns.results;h.setDeferredGroups([k.groupId]);var P=e.oData.ResultDataObjectStatus&&(this.oResultInput.getSelectedKey()!="")?true:false;var Q=e.oData.needToRefresh?true:false;var R=s.updateResultColCells?true:false;G(e.oData.DecisionTable.DecisionTableColumns.deleted);F(O,P);var U=this.getProperty("newDecisionTable");if(U){m=true;y(O.length,j);}else if(e.oData.DecisionTable.HitPolicyStatus==="U"){m=true;p(r,v,H,k);}if(P||Q){m=true;u(e.oData.ResultDataObjectId);w(e.oData.ResultDataObjectId);}if(R){m=true;w(e.oData.ResultDataObjectId);}var W=e.oData.needToRefresh;if(W){m=true;x();}if(U){K(O.length+1);}var X={};X.success=J;X.groupId=k.groupId;if(m){h.submitChanges(X);return;}else{o.setState(sap.ui.core.ValueState.Success);o.close();}};return D;},true);