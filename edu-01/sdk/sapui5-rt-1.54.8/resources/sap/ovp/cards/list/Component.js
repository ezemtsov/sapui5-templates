sap.ui.define(["sap/ovp/cards/generic/Component"],function(C){"use strict";return C.extend("sap.ovp.cards.list.Component",{metadata:{properties:{"contentFragment":{"type":"string","defaultValue":"sap.ovp.cards.list.List"},"annotationPath":{"type":"string","defaultValue":"com.sap.vocabularies.UI.v1.LineItem"},"countHeaderFragment":{"type":"string","defaultValue":"sap.ovp.cards.generic.CountHeader"},"headerExtensionFragment":{"type":"string","defaultValue":"sap.ovp.cards.generic.KPIHeader"}},version:"1.54.4",library:"sap.ovp",includes:[],dependencies:{libs:["sap.suite.ui.microchart"],components:[]},config:{},customizing:{"sap.ui.controllerExtensions":{"sap.ovp.cards.generic.Card":{controllerName:"sap.ovp.cards.list.List"}}}}});});