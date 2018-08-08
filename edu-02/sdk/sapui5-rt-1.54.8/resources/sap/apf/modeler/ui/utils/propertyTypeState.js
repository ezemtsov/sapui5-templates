/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare('sap.apf.modeler.ui.utils.propertyTypeState');jQuery.sap.require("sap.apf.modeler.ui.utils.nullObjectChecker");(function(){'use strict';var n=sap.apf.modeler.ui.utils.nullObjectChecker;sap.apf.modeler.ui.utils.PropertyTypeState=function(){this.aProperties=[];this.aPropertyTypeViewIds=[];};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.constructor=sap.apf.modeler.ui.utils.PropertyTypeState;sap.apf.modeler.ui.utils.PropertyTypeState.prototype.addProperty=function(p){if(!n.checkIsNotNullOrUndefinedOrBlank(p)){return;}this.aProperties.push(p);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.addPropertyAt=function(p,a){if(!n.checkIsNotNullOrUndefinedOrBlank(p)){return;}if(a>this.aProperties.length&&a>=0){return;}this.aProperties.splice(a,0,p);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.updatePropertyAt=function(N,a){if(!n.checkIsNotNullOrUndefinedOrBlank(N)){return;}if(a>this.aProperties.length&&a>=0){return;}this.aProperties[a]=N;};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.removePropertyAt=function(a){if(a>this.aProperties.length&&a>=0){return;}this.aProperties.splice(a,1);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.removeAllProperties=function(){this.aProperties.splice(0,this.aProperties.length);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.isPropertyPresentExactlyOnce=function(p){var a,b=0;for(a=0;a<this.aProperties.length;a++){if(this.aProperties[a]===p){b++;}}if(b===1){return true;}return false;};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.getPropertyValueState=function(){return this.aProperties;};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.addPropertyTypeViewId=function(v){if(!n.checkIsNotNullOrUndefinedOrBlank(v)){return;}this.aPropertyTypeViewIds.push(v);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.addPropertyTypeViewIdAt=function(v,a){if(!n.checkIsNotNullOrUndefinedOrBlank(v)){return;}if(a>this.aProperties.length&&a>=0){return;}this.aPropertyTypeViewIds.splice(a,0,v);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.removePropertyTypeViewIdAt=function(a){if(a>this.aProperties.length&&a>=0){return;}this.aPropertyTypeViewIds.splice(a,1);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.removeAllPropertyTypeViewIds=function(){this.aPropertyTypeViewIds.splice(0,this.aPropertyTypeViewIds.length);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.indexOfPropertyTypeViewId=function(v){return this.aPropertyTypeViewIds.indexOf(v);};sap.apf.modeler.ui.utils.PropertyTypeState.prototype.getViewAt=function(a){if(!n.checkIsNotNullOrUndefinedOrBlank(a)){return;}return sap.ui.getCore().byId(this.aPropertyTypeViewIds[a]);};})();