sap.ui.define(["jquery.sap.global","sap/suite/ui/commons/library","./SvgBase","sap/ui/base/ManagedObject","sap/ui/core/theming/Parameters"],function(q,l,S,M,P){var a=l.networkgraph.ElementStatus;var E=S.extend("sap.suite.ui.commons.networkgraph.ElementBase",{metadata:{properties:{title:{type:"string",group:"Misc",defaultValue:null},description:{type:"string",group:"Misc",defaultValue:null},status:{type:"string",group:"Appearance",defaultValue:a.Standard}},aggregations:{attributes:{type:"sap.suite.ui.commons.networkgraph.ElementAttribute",multiple:true,singularName:"attribute"}}},renderer:{}});E.prototype._afterRenderingBase=function(){var $,s;if(this._cannotAppendInnerHtml()){$=this.$().parent();s=this._convertToSvg(q.parseHTML(this._render()));$[0].replaceChild(s,this.$()[0]);}else{this.$()[0].outerHTML=this._render();}this._afterRendering();};E.prototype._setFocus=function(f){var n=f?"addClass":"removeClass";this.$()[n](this.FOCUS_CLASS);};E.prototype._useInLayout=function(){return true;};E.prototype._hasFocus=function(){return this.$().hasClass(this.FOCUS_CLASS);};E.prototype._hasCustomStatus=function(s){var s=s||this.getStatus();if(s===a.Standard||s===a.Error||s===a.Warning||s===a.Success){return false;}return!!s;};E.prototype._getColor=function(t){var s=this.getStatus(),p=this.getParent(),f,o,c="";if(!this._hasCustomStatus(s)){return"";}if(!p||!t){return"";}o=p._oStatuses[s];if(o){if(t.indexOf("Focus")!==-1){if(!o.getUseFocusColorAsContentColor()){return"";}t=t.replace("Focus","Content");}f="get"+t+"Color";if(o[f]){c=P.get(o[f]());}}return c?c:"";};E.prototype._getColorStyle=function(p){var s="";Object.keys(p).forEach(function(k){var c=this._getColor(p[k]);if(c){if(s){s+=";";}s+=k+":"+c;}},this);return s;};E.prototype._checkForProcessData=function(){var p=this.getParent();if(p&&p._bRequiresDataProcessing){p._processData();}};E.prototype.getVisibleAttributes=function(){return this.getAttributes().filter(function(A){return A.getVisible();});};E.prototype.setProperty=function(p,v,s){var b=Object.getPrototypeOf(this).aProcessRequiredProperties;M.prototype.setProperty.call(this,p,v,s);if(b&&(b.indexOf(p)!==-1)&&this.getParent()){this.getParent()._bRequiresDataProcessing=true;}};E.prototype.toString=function(){return this.getMetadata()._sClassName+" - "+this.getTitle();};E.prototype._correctTitle=function(c){if(this.getTitle()){var $=this.$().find("."+c);if($[0]){var t=$[0].getBBox().width,m=parseInt($.attr("maxwidth"),10);if(t>m){this._createText($[0],{text:this.getTitle(),hCenter:true});}}}};E.prototype._renderTitle=function(A){var b=10;var h=this._renderControl("g",{"clip-path":"url(#"+this.getId()+"-title-clip)"},false);h+=this._renderText({attributes:{"style":A.style,"class":A.class,x:A.x,y:A.y,maxWidth:A.maxWidth},text:A.title,height:b});h+="</g>";return h;};E.prototype._renderClipPath=function(A){var h=this._renderControl("clipPath",{id:A.id},false);h+=this._renderControl("rect",{x:A.x,y:A.y,width:A.width||this._iWidth,height:A.height||this._iHeight});h+="</clipPath>";return h;};E.prototype.setVisible=function(v){var g=this.getParent();this.setProperty("visible",v,false);if(g){g.setFocus(null);g._setupKeyboardNavigation();}return this;};E.ColorType=Object.freeze({Background:"Background",Border:"Border",Content:"Content",SelectedBorder:"SelectedBorder",SelectedBackground:"SelectedBackground",SelectedContent:"SelectedContent",HoverBackground:"HoverBackground",HoverBorder:"HoverBorder",HoverContent:"HoverContent",Focus:"Focus",HoverFocus:"HoverFocus",SelectedFocus:"SelectedFocus"});return E;});