// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/components/flp/launchpad/DashboardManager','sap/ushell/resources','sap/ui/core/UIComponent','sap/ushell/components/flp/ComponentKeysHandler','sap/ushell/components/flp/CustomRouter'],function(D,r,U,C,a){return U.extend("sap.ushell.components.flp.Component",{metadata:{routing:{config:{viewType:"JS",controlAggregation:"pages",controlId:"navContainerFlp",clearAggregation:false,routerClass:a},targets:{appFinder:{viewName:"sap.ushell.components.flp.launchpad.appfinder.AppFinder"},home:{viewName:"sap.ushell.components.flp.launchpad.dashboard.DashboardContent"}},routes:[{name:"home",target:'home',pattern:"home"}]},version:"1.54.6",library:"sap.ushell.components.flp",dependencies:{libs:["sap.m"]},config:{semanticObject:'Shell',action:'home',title:r.i18n.getText("homeBtn_tooltip"),fullWidth:true,hideLightBackground:true}},PERS_KEY:"flp.settings.FlpSettings",parseOldCatalogParams:function(u){"use strict";var p=jQuery.sap.getUriParameters(u).mParams,v,k;for(k in p){if(p.hasOwnProperty(k)){v=p[k][0];p[k]=v.indexOf('/')!==-1?encodeURIComponent(v):v;}}return p;},handleNavigationFilter:function(n){"use strict";var s=sap.ushell.Container.getService("URLParsing").parseShellHash(n),p;if(s&&s.semanticObject==='shell'&&s.action==='catalog'){p=this.parseOldCatalogParams(n);setTimeout(function(){this.getRouter().navTo('appFinder',{'menu':'catalog',filters:JSON.stringify(p)});}.bind(this),0);return this.oShellNavigation.NavigationFilterStatus.Abandon;}return this.oShellNavigation.NavigationFilterStatus.Continue;},createContent:function(){"use strict";this.oRouter=this.getRouter();this.oModel=new sap.ui.model.json.JSONModel({animationMode:'full',groups:[],animationRendered:false,tagFiltering:true,searchFiltering:true,catalogSelection:true,tileActionModeEnabled:false,tileActionModeActive:false,isInDrag:false,rtl:sap.ui.getCore().getConfiguration().getRTL(),personalization:true,editTitle:false,tagList:[],selectedTags:[],userPreferences:{entries:[]},enableNotificationsPreview:false,previewNotificationItems:[],viewPortState:sap.ushell.Container.getRenderer('fiori2').getCurrentViewportState(),draggedTileLinkPersonalizationSupported:true});this.bCoreResourcesLoaded=!!jQuery.sap.isDeclared('sap.fiori.core-ext-light',true);sap.ui.getCore().getEventBus().subscribe("sap.ushell.services.Notifications","enablePreviewNotificationChanged",this.updateNotificationConfiguration,this);sap.ui.getCore().getEventBus().subscribe("sap.ushell.services.UsageAnalytics","usageAnalyticsStarted",function(){sap.ui.require(["sap/ushell/components/flp/FLPAnalytics"]);});sap.ui.getCore().getEventBus().subscribe("sap.ushell","coreResourcesFullyLoaded",function(){this.bCoreResourcesLoaded=true;this.updateNotificationConfiguration();},this);this.oModel.setSizeLimit(10000);this.setModel(this.oModel);this.oConfig=this.getComponentData().config;this.oShellConfig=sap.ushell.renderers.fiori2.RendererExtensions.getConfiguration();sap.ui.getCore().getEventBus().subscribe('launchpad','afterSwitchState',this._handleShellViewPortSateChange,this);var n,m,h,H,s,p,c,P=(this.oConfig&&(this.oConfig.enablePersonalization||this.oConfig.enablePersonalization===undefined))&&(this.oShellConfig&&this.oShellConfig.enablePersonalization||this.oShellConfig.enablePersonalization===undefined);if(P){this.oRouter.addRoute({name:"catalog",target:'appFinder',pattern:"catalog/:filters:"});this.oRouter.addRoute({name:"appFinder",target:'appFinder',pattern:"appFinder/{menu}/:filters:"});}this.oRouter.addRoute({name:"all",target:'home',pattern:":all*:"});this._setConfigurationToModel(this.oConfig);var d={model:this.oModel,config:this.oConfig,router:this.oRouter};this.oDashboardManager=new D("dashboardMgr",d);this.setModel(r.i18nModel,"i18n");m=window.matchMedia("(min-width: 800px)");h=function(b){this.oModel.setProperty("/isPhoneWidth",!b.matches);}.bind(this);if(m.addListener){m.addListener(h);h(m);}sap.ui.getCore().getEventBus().subscribe("launchpad","togglePane",this._createAndAddGroupList,this);this.bContactSupportEnabled=sap.ushell.Container.getService("SupportTicket").isEnabled();if(this.bContactSupportEnabled){jQuery.sap.require("sap.ushell.UserActivityLog");sap.ushell.UserActivityLog.activate();}n=this.initNavContainer();this.setInitialConfiguration();this.oShellNavigation=sap.ushell.Container.getService("ShellNavigation");this.oShellNavigation.registerNavigationFilter(jQuery.proxy(this.handleNavigationFilter,this));H=hasher.getHash();s=sap.ushell.Container.getService("URLParsing").parseShellHash(H);if(s&&s.semanticObject==='shell'&&s.action==='catalog'){p=this.parseOldCatalogParams(H);c=this.getMetadata().getConfig();this.oShellNavigation.toExternal({target:{semanticObject:c.semanticObject,action:c.action}});this.getRouter().navTo('appFinder',{'menu':'catalog',filters:JSON.stringify(p)});}if(this.oConfig.enableHomePageSettings!==false){sap.ui.getCore().getEventBus().subscribe("launchpad","Settings",this._addFlpSettings,this);}return n;},_createAndAddGroupList:function(c,e,d){"use strict";if(d.currentContent&&(d.currentContent.indexOf('groupList')!==-1||!d.currentContent.length)){var o=this.oConfig,g=this.runAsOwner(function(){return this.oDashboardManager.getGroupListView(o);}.bind(this));if(!g.alreadyCreated){g.groupList.setModel(this.oModel);g.groupList.setModel(r.i18nModel,"i18n");sap.ushell.renderers.fiori2.RendererExtensions.setLeftPaneContent(g.groupList,"home");}}},_setConfigurationToModel:function(c){"use strict";var m=this.oModel,t,R=sap.ushell.Container.getRenderer('fiori2').getModelConfiguration();this.updateNotificationConfiguration();if(c){if(c.enablePersonalization!==undefined&&this.oShellConfig.enablePersonalization!==undefined){m.setProperty("/personalization",c.enablePersonalization&&this.oShellConfig.enablePersonalization);}else if(c.enablePersonalization!==undefined){m.setProperty("/personalization",c.enablePersonalization);}else if(this.oShellConfig.enablePersonalization!==undefined){m.setProperty("/personalization",this.oShellConfig.enablePersonalization);}if(c.optimizeTileLoadingThreshold!==undefined){m.setProperty("/OptimizeTileLoadingThreshold",c.optimizeTileLoadingThreshold);}if(c.segments!==undefined){m.setProperty("/segments",c.segments);}if(c.initialStateNotificationsPreview!==undefined){m.setProperty("/enableNotificationsPreview",c.initialStateNotificationsPreview);}if(c.enableLockedGroupsCompactLayout!==undefined){m.setProperty("/enableLockedGroupsCompactLayout",c.enableLockedGroupsCompactLayout);}if(c.enableCatalogSelection!==undefined){m.setProperty("/catalogSelection",c.enableCatalogSelection);}if(c.enableTilesOpacity!==undefined){m.setProperty("/tilesOpacity",c.enableTilesOpacity);}if(c.enableDragIndicator!==undefined){m.setProperty("/enableDragIndicator",c.enableDragIndicator);}t=false;if(c.enableActionModeMenuButton!==undefined){m.setProperty("/actionModeMenuButtonEnabled",c.enableActionModeMenuButton);t=c.enableActionModeMenuButton;}if(c.enableRenameLockedGroup!==undefined){m.setProperty("/enableRenameLockedGroup",c.enableRenameLockedGroup);}else{m.setProperty("/enableRenameLockedGroup",false);}if(c.enableActionModeFloatingButton!==undefined){m.setProperty("/actionModeFloatingButtonEnabled",c.enableActionModeFloatingButton);t=t||c.enableActionModeFloatingButton;}m.setProperty("/tileActionModeEnabled",t);if(c.enableTileActionsIcon!==undefined){m.setProperty("/tileActionsIconEnabled",sap.ui.Device.system.desktop?c.enableTileActionsIcon:false);}if(c.enableHideGroups!==undefined){m.setProperty("/enableHideGroups",c.enableHideGroups);}if(c.title){m.setProperty("/title",c.title);}if(c.enableEasyAccess!=undefined&&!c.enableEasyAccess){m.setProperty("/enableEasyAccessSAPMenu",c.enableEasyAccess);m.setProperty("/enableEasyAccessUserMenu",c.enableEasyAccess);m.setProperty("/enableEasyAccessUserMenuSearch",c.enableEasyAccess);m.setProperty("/enableEasyAccessSAPMenuSearch",c.enableEasyAccess);}else{if(c.enableEasyAccessSAPMenu!==undefined){m.setProperty("/enableEasyAccessSAPMenu",c.enableEasyAccessSAPMenu);if(!c.enableEasyAccessSAPMenu){m.setProperty("/enableEasyAccessSAPMenuSearch",false);}else{if(c.enableEasyAccessSAPMenuSearch!==undefined){m.setProperty("/enableEasyAccessSAPMenuSearch",c.enableEasyAccessSAPMenuSearch);}else{m.setProperty("/enableEasyAccessSAPMenuSearch",true);}}}else{m.setProperty("/enableEasyAccessSAPMenu",c.enableEasyAccess);if(c.enableEasyAccessSAPMenuSearch!==undefined){m.setProperty("/enableEasyAccessSAPMenuSearch",c.enableEasyAccessSAPMenuSearch);}else{m.setProperty("/enableEasyAccessSAPMenuSearch",c.enableEasyAccess);}}if(c.enableEasyAccessUserMenu!==undefined){m.setProperty("/enableEasyAccessUserMenu",c.enableEasyAccessUserMenu);if(!c.enableEasyAccessUserMenu){m.setProperty("/enableEasyAccessUserMenuSearch",false);}else{if(c.enableEasyAccessUserMenuSearch!==undefined){m.setProperty("/enableEasyAccessUserMenuSearch",c.enableEasyAccessUserMenuSearch);}else{m.setProperty("/enableEasyAccessUserMenuSearch",true);}}}else{m.setProperty("/enableEasyAccessUserMenu",c.enableEasyAccess);if(c.enableEasyAccessUserMenuSearch!==undefined){m.setProperty("/enableEasyAccessUserMenuSearch",c.enableEasyAccessUserMenuSearch);}else{m.setProperty("/enableEasyAccessUserMenuSearch",c.enableEasyAccess);}}}if(c.enableSearchFiltering!==undefined){m.setProperty("/searchFiltering",c.enableSearchFiltering);}else if(c.enableCatalogSearch!==undefined){m.setProperty("/searchFiltering",c.enableCatalogSearch);}else{m.setProperty("/searchFiltering",true);}if(c.enableTagFiltering!==undefined){m.setProperty("/tagFiltering",c.enableTagFiltering);}else if(c.enableCatalogTagFilter!==undefined){m.setProperty("/tagFiltering",c.enableCatalogTagFilter);}else{m.setProperty("/tagFiltering",true);}if(c.sapMenuServiceUrl!==undefined){m.setProperty("/sapMenuServiceUrl",c.sapMenuServiceUrl);}if(c.userMenuServiceUrl!==undefined){m.setProperty("/userMenuServiceUrl",c.userMenuServiceUrl);}if(c.easyAccessNumbersOfLevels!==undefined){m.setProperty("/easyAccessNumbersOfLevels",c.easyAccessNumbersOfLevels);}var d=c.enableHomePageSettings!==false?this._getCurrentHomePageGroupDisplay():jQuery.Deferred().resolve();d.done(function(s){s=s||c.homePageGroupDisplay;if(s!==undefined){m.setProperty("/homePageGroupDisplay",s);}});m.setProperty("/enableHelp",!!this.oShellConfig.enableHelp);m.setProperty("/disableSortedLockedGroups",!!c.disableSortedLockedGroups);if(R.animationMode){m.setProperty("/animationMode",R.animationMode);}}},initNavContainer:function(c){"use strict";var n=new sap.m.NavContainer({id:"navContainerFlp",defaultTransitionName:'show'});return n;},setInitialConfiguration:function(){"use strict";this.oRouter.initialize();if(!sap.ui.Device.system.phone){C.init(this.oModel,this.oRouter);sap.ushell.renderers.fiori2.AccessKeysHandler.registerAppKeysHandler(C.handleFocusOnMe);var t=r.i18n,s=[];s.push({text:"Alt+H",description:t.getText("hotkeyHomePage")});if(this.oModel.getProperty("/personalization")){s.push({text:"Alt+A",description:t.getText("hotkeyAppFinder")});s.push({text:"Ctrl+Enter",description:t.getText("hotkeySaveEditing")});}sap.ushell.renderers.fiori2.AccessKeysHandler.registerAppShortcuts(C.handleShortcuts,s);}sap.ui.getCore().getEventBus().publish("launchpad","initialConfigurationSet");},_handleShellViewPortSateChange:function(n,e,E){"use strict";var c=E?E.getParameter('to'):'';this.oModel.setProperty('/viewPortState',c);},updateNotificationConfiguration:function(c,e,d){"use strict";var t=this,R=sap.ushell.Container.getRenderer('fiori2').getModelConfiguration(),o=sap.ui.Device,E=R.enableNotificationsUI,n=sap.ushell.Container.getService("Notifications").isEnabled(),N=R.appState!=="embedded"&&R.appState!=="headerless"&&R.appState!=="merged"&&R.appState!=="standalone",o=sap.ui.Device,u=true,p=true,b,f=o.system.desktop||sap.ui.Device.system.tablet||sap.ui.Device.system.combi;if(!this.bCoreResourcesLoaded){return;}if(n===true){b=sap.ushell.Container.getService("Notifications").getUserSettingsFlags();b.done(function(g){u=g.previewNotificationEnabled;t.oModel.setProperty("/userEnableNotificationsPreview",u);t.oModel.setProperty("/configEnableNotificationsPreview",p);if(p&&E&&n&&f&&N){t.oModel.setProperty("/enableNotificationsPreview",u);}});}},_addFlpSettings:function(){"use strict";if(this.bFlpSettingsAdded){return;}var R=sap.ushell.Container.getRenderer("fiori2"),o=r.i18n,t=this;var f;var e={title:o.getText('FlpSettings_entry_title'),entryHelpID:"flpSettingsEntry",value:function(){return jQuery.Deferred().resolve(" ");},content:function(){f=sap.ui.xmlview({viewName:"sap.ushell.components.flp.settings.FlpSettings",viewData:{initialDisplayMode:t.oModel.getProperty("/homePageGroupDisplay")||"scroll"}});return jQuery.Deferred().resolve(f);},onSave:function(){var d=f.getController().onSave();var b=t._getPersonalizer("homePageGroupDisplay").setPersData(d);b.fail(function(c){jQuery.sap.log.error("Failed to save the anchor bar mode in personalization",c,"sap.ushell.components.flp.settings.FlpSettings");});t.oModel.setProperty("/homePageGroupDisplay",d);setTimeout(function(){t.oDashboardManager.handleDisplayModeChange(d);},0);return jQuery.Deferred().resolve();},onCancel:function(){return jQuery.Deferred().resolve();},icon:"sap-icon://home"};R.addUserPreferencesEntry(e);this.bFlpSettingsAdded=true;},_getCurrentHomePageGroupDisplay:function(){'use strict';var d=this._getPersonalizer('homePageGroupDisplay').getPersData();d.fail(function(e){jQuery.sap.log.error("Failed to load anchor bar state from the personalization",e,"sap.ushell.components.flp.settings.FlpSettings");});return d;},_getPersonalizer:function(i){"use strict";var p=sap.ushell.Container.getService("Personalization");var c=sap.ui.core.Component.getOwnerComponentFor(this);var s={keyCategory:p.constants.keyCategory.FIXED_KEY,writeFrequency:p.constants.writeFrequency.LOW,clientStorageAllowed:true};var P={container:this.PERS_KEY,item:i};return p.getPersonalizer(P,s,c);},exit:function(){"use strict";sap.ui.getCore().getEventBus().unsubscribe('launchpad','shellViewStateChanged',this._handleShellViewPortSateChange,this);this.oDashboardManager.destroy();}});});