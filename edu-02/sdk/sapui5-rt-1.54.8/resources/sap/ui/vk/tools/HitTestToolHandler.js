sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider"],function(q,E){"use strict";var H=E.extend("sap.ui.vk.tools.HitTestToolHandler",{metadata:{publicMethods:["beginGesture","endGesture","click","doubleClick","contextMenu"]},constructor:function(T){this._tool=T;this._rect=null;this._gesture=false;this._nomenu=false;}});H.prototype.destroy=function(){this._tool=null;this._rect=null;this._gesture=false;};H.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};H.prototype._inside=function(e){var i=this._tool._viewport.getIdForLabel();var d=document.getElementById(i);if(d==null){return false;}var o=this._getOffset(d);this._rect={x:o.x,y:o.y,w:d.offsetWidth,h:d.offsetHeight};return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};H.prototype.beginGesture=function(e){e.handled=false;};H.prototype.move=function(e){e.handled=false;};H.prototype.endGesture=function(e){e.handled=false;};H.prototype._executeHittest=function(e,c){if(this._inside(e)&&!this._gesture){this._gesture=false;var x=e.x-this._rect.x,y=e.y-this._rect.y;this._gizmo=this._tool.getGizmo();if(this._gizmo){this._gizmo.show(this._tool._viewport);this._gizmo.moveGizmo(x,y);}var s=this._tool._viewport.getScene().getSceneRef();var a=this._tool._viewport.getCamera().getCameraRef();this._tool.hitTest(x,y,s,a,c);if(this._gizmo){this._gizmo.hide();}}};H.prototype.click=function(e){this._executeHittest(e,sap.ui.vk.tools.HitTestClickType.Single);e.handled=true;};H.prototype.doubleClick=function(e){this._executeHittest(e,sap.ui.vk.tools.HitTestClickType.Double);e.handled=false;};H.prototype.contextMenu=function(e){this._executeHittest(e,sap.ui.vk.tools.HitTestClickType.Context);e.handled=false;};H.prototype.getViewport=function(){return this._tool._viewport;};return H;},true);