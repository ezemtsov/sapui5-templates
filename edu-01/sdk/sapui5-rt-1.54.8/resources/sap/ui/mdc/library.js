/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/mdc/experimental/provider/ProviderHook','sap/ui/core/XMLComposite','sap/ui/core/util/XMLPreprocessor','sap/ui/fl/variants/VariantManagement'],function(P,X,a,V){"use strict";sap.ui.getCore().initLibrary({version:"1.54.7",name:"sap.ui.mdc",dependencies:["sap.ui.core","sap.m"],designtime:"sap/ui/mdc/designtime/library.designtime",types:["sap.ui.mdc.FieldDisplay","sap.ui.mdc.EditMode"],interfaces:[],controls:["sap.ui.mdc.Table","sap.ui.mdc.FilterBar","sap.ui.mdc.base.Field","sap.ui.mdc.base.FilterField"],elements:["sap.ui.mdc.base.FieldHelpBase","sap.ui.mdc.base.CustomFieldHelp","sap.ui.mdc.base.ListFieldHelp","sap.ui.mdc.base.TableFieldHelp"],extensions:{flChangeHandlers:{"sap.ui.mdc.Table":"sap/ui/mdc/internal/table/Table","sap.ui.mdc.FilterBar":"sap/ui/mdc/internal/filterbar/FilterBar"}},noLibraryCSS:false});sap.ui.mdc.FieldDisplay={Value:"Value",Description:"Description",ValueDescription:"ValueDescription",DescriptionValue:"DescriptionValue"};sap.ui.mdc.EditMode={Display:"Display",Editable:"Editable",ReadOnly:"ReadOnly",Disabled:"Disabled"};P.apply();function v(n,o){var b=n.getAttribute('metadataContexts');if(b){n.removeAttribute('metadataContexts');}o.visitAttributes(n);if(b){if(b.indexOf('sap.fe.deviceModel')<0){b+=",{model: 'sap.fe.deviceModel', path: '/', name: 'sap.fe.deviceModel'}";}n.setAttribute('metadataContexts',b);}}function r(n,o){v(n,o);X.initialTemplating(n,o,this);n.removeAttribute('metadataContexts');}a.plugIn(r.bind("sap.ui.mdc.Table"),"sap.ui.mdc","Table");a.plugIn(r.bind("sap.ui.mdc.Field"),"sap.ui.mdc","Field");a.plugIn(r.bind("sap.ui.mdc.FilterField"),"sap.ui.mdc","FilterField");a.plugIn(r.bind("sap.ui.mdc.FilterBar"),"sap.ui.mdc","FilterBar");return sap.ui.mdc;});