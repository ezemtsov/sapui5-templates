sap.ui.define(["jquery.sap.global"],function(q){"use strict";return a;function c(){return["error","warning","info","debug"].reduce(function(x,l){x[l]=function(M){return q.sap.log[l](M);};return x;},{});}function m(b){b.setLogonFrameProvider=function(l){b.logonFrameProvider=l;};if(!b.setTimeout){b.setTimeout=function(){};}return b;}function a(s,x){var f=x.FrameLogonManager.startup();var C=m(f);XMLHttpRequest.logger=c();s.oFrameLogonManager=C;}});