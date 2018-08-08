/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/Popup','sap/m/Text','sap/m/Button','sap/ui/core/ResizeHandler','sap/ui/Device','sap/ui/core/Icon','sap/ui/layout/VerticalLayout','./InstanceManager','sap/ui/core/InvisibleText','sap/ui/core/library','./LightBoxRenderer'],function(q,l,C,P,T,B,R,D,I,V,a,b,c,L){'use strict';var d=c.TextAlign;var e=l.ButtonType;var f=l.LightBoxLoadingStates;var g=C.extend('sap.m.LightBox',{metadata:{interfaces:['sap.ui.core.PopupInterface'],library:'sap.m',aggregations:{imageContent:{type:'sap.m.LightBoxItem',multiple:true,bindable:"bindable"},_closeButton:{type:'sap.m.Button',multiple:false,visibility:'hidden'},_errorIcon:{type:'sap.ui.core.Icon',multiple:false,visibility:'hidden'},_errorTitle:{type:'sap.m.Text',multiple:false,visibility:'hidden'},_errorSubtitle:{type:'sap.m.Text',multiple:false,visibility:'hidden'},_verticalLayout:{type:'sap.ui.layout.VerticalLayout',multiple:false,visibility:'hidden'},_invisiblePopupText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_busy:{type:"sap.m.BusyIndicator",multiple:false,visibility:"hidden"}},events:{},defaultAggregation:'imageContent',designtime:"sap/m/designtime/LightBox.designtime"}});g.prototype.init=function(){this._createPopup();this._width=0;this._height=0;this._isRendering=true;this._resizeListenerId=null;this._$lightBox=null;this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._closeButtonText=this._rb.getText("LIGHTBOX_CLOSE_BUTTON");if(sap.ui.getCore().getConfiguration().getAccessibility()){this.setAggregation("_invisiblePopupText",new b());}};g.prototype.onBeforeRendering=function(){var i=this._getImageContent(),n=i._getNativeImage(),s=i.getImageSrc(),S=i._getImageState();this._createErrorControls();if(n.src!==s){n.src=s;}if(this._resizeListenerId){D.resize.detachHandler(this._onResize);R.deregister(this._resizeListenerId);this._resizeListenerId=null;}switch(S){case f.Loading:this._timeoutId=setTimeout(function(){i._setImageState(f.TimeOutError);},10000);break;case f.Loaded:clearTimeout(this._timeoutId);this._calculateSizes(n);break;case f.Error:clearTimeout(this._timeoutId);break;default:break;}var o=this.getAggregation('_invisiblePopupText');if(i&&o){o.setText(this._rb.getText("LIGHTBOX_ARIA_ENLARGED",i.getTitle()));}this._isRendering=true;};g.prototype.onAfterRendering=function(){this._isRendering=false;this._$lightBox=this.$();if(!this._resizeListenerId){this._onResizeHandler=this._onResize.bind(this);D.resize.attachHandler(this._onResizeHandler);this._resizeListenerId=R.register(this,this._onResizeHandler);}};g.prototype.forceInvalidate=C.prototype.invalidate;g.prototype.invalidate=function(o){var i=this._getImageContent();if(this.isOpen()){if(i&&i.getImageSrc()){this.forceInvalidate(o);}else{this.close();}}return this;};g.prototype.exit=function(){if(this._oPopup){this._oPopup.detachOpened(this._fnOpened,this);this._oPopup.detachClosed(this._fnClosed,this);this._oPopup.destroy();this._oPopup=null;}if(this._resizeListenerId){D.resize.detachHandler(this._onResizeHandler);R.deregister(this._resizeListenerId);this._resizeListenerId=null;}a.removeLightBoxInstance(this);};g.prototype.open=function(){var i=this._getImageContent();this._oPopup.setContent(this);if(i&&i.getImageSrc()){this._oPopup.open(300,'center center','center center',document.body,null);a.addLightBoxInstance(this);}return this;};g.prototype.isOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){return true;}return false;};g.prototype.close=function(){if(this._resizeListenerId){D.resize.detachHandler(this._onResizeHandler);R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this._oPopup.close();a.removeLightBoxInstance(this);return this;};g.prototype._getCloseButton=function(){var i=this.getAggregation('_closeButton');if(!i){i=new B({id:this.getId()+'-closeButton',text:this._closeButtonText,type:e.Transparent,press:function(){this.close();}.bind(this)});this.setAggregation('_closeButton',i,true);}return i;};g.prototype._getBusyIndicator=function(){var i=this.getAggregation("_busy");if(!i){i=new sap.m.BusyIndicator();this.setAggregation("_busy",i,true);}return i;};g.prototype._imageStateChanged=function(n){var s=n===f.Loaded||n===f.Error;if(s&&!this._isRendering){this.rerender();}};g.prototype._createPopup=function(){this._oPopup=new P(this,true,true);this._oPopup.attachOpened(this._fnOpened,this);this._oPopup.attachClosed(this._fnClosed,this);};g.prototype._fnOpened=function(){var t=this;q('#sap-ui-blocklayer-popup').on("click",function(){t.close();});};g.prototype._fnClosed=function(){q('#sap-ui-blocklayer-popup').off("click");};g.prototype._createErrorControls=function(){var r=this._rb;var i;var j;if(this._getImageContent()._getImageState()===f.TimeOutError){i=r.getText('LIGHTBOX_IMAGE_TIMED_OUT');j=r.getText('LIGHTBOX_IMAGE_TIMED_OUT_DETAILS');}else{i=r.getText('LIGHTBOX_IMAGE_ERROR');j=r.getText('LIGHTBOX_IMAGE_ERROR_DETAILS');}if(!this.getAggregation('_verticalLayout')){var k=new T({text:i,textAlign:d.Center}).addStyleClass("sapMLightBoxErrorTitle"),m=new T({text:j,textAlign:d.Center}).addStyleClass("sapMLightBoxErrorSubtitle"),n=new I({src:"sap-icon://picture"}).addStyleClass("sapMLightBoxErrorIcon");this.setAggregation('_verticalLayout',new V({content:[n,k,m]}).addStyleClass('sapMLightBoxVerticalLayout'));}};g.prototype._onResize=function(){var m=h()/2+'px',t=m,i=m,j='',k='',o=this._getImageContent(),n=this.getDomRef(),p,r,s=h(),u=2;if(o._getImageState()===f.Loaded){this._calculateSizes(o._getNativeImage());p=this._width;r=this._height;this._$lightBox.width(p);this._$lightBox.height(r);}else{p=n.clientWidth;r=n.clientHeight;}if(window.innerWidth>p+s){i='50%';k=Math.round(-p/2);}if(window.innerHeight>r+s){t='50%';j=Math.round(-r/2);}if(sap.ui.getCore().getConfiguration().getTheme()==='sap_hcb'){j-=u;k-=u;}this._$lightBox.css({'top':t,'margin-top':j,'left':i,'margin-left':k});};g.prototype._calculateSizes=function(i){var F=this._calculateFooterHeightInPx(),j=288-F,k=this._getImageContent().getAggregation("_image"),m;this._setImageSize(k,i.naturalWidth,i.naturalHeight);this._calculateAndSetLightBoxSize(k);m=this._pxToNumber(k.getHeight());this.toggleStyleClass('sapMLightBoxMinSize',(m<j));this._isBusy=false;};g.prototype._calculateFooterHeightInPx=function(){var i=this.$().parents().hasClass('sapUiSizeCompact');var s=this._getImageContent().getSubtitle();var j=2.5;if(!i){j+=0.5;}if(s){j+=1.5;}return j*16;};g.prototype._calculateAndSetLightBoxSize=function(i){var j,k=(20*16),m=(18*16),F=this._calculateFooterHeightInPx();j=this._pxToNumber(i.getHeight());this._width=Math.max(k,this._pxToNumber(i.getWidth()));this._height=Math.max(m,j+F);};g.prototype._setImageSize=function(i,j,k){var m=this._calculateFooterHeightInPx(),n=this._getDimensions(j,k,m);i.setWidth(n.width+'px');i.setHeight(n.height+'px');};g.prototype._getDimensions=function(i,j,k){var m=20*16,n=18*16,$=q(window),w=$.height(),o=$.width(),p=h(),r=Math.max(o-p,m),s=Math.max(w-p,n),t;s-=k;if(j<=s){if(i<=r){}else{j*=r/i;i=r;}}else{if(i<=r){i*=s/j;j=s;}else{t=Math.max(i/r,j/s);i/=t;j/=t;}}return{width:Math.round(i),height:Math.round(j)};};g.prototype._pxToNumber=function(s){return(s.substring(0,(s.length-2)))*1;};g.prototype._getImageContent=function(){var r=this.getAggregation('imageContent');return r&&r[0];};function h(){var s=D.system;if(s.desktop){return 4*16;}if(s.tablet){return 2*16;}return 0;}return g;});