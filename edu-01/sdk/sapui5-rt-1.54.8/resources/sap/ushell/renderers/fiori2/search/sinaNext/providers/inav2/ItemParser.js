sinaDefine(['../../core/core','../../core/util','./pivotTableParser','./typeConverter','../../sina/fiori/FioriIntentsResolver','../../sina/NavigationTarget'],function(c,u,p,t,I,N){return c.defineClass({_init:function(a){this.provider=a;this.sina=a.sina;this.intentsResolver=this.sina._createFioriIntentsResolver();},parse:function(s,d){var a=this.parseTotalCount(d);d=p.parse(d);if(d.axes.length===0){return Promise.resolve({totalCount:0,items:[]});}var b=d.axes[0];var e=[];for(var i=0;i<b.length;++i){var f=b[i];f=this.addGeoDataIfAvailable(f);this.provider.metadataParser.parseSearchRequestMetadata(f);var g=this.parseItem(f);e.push(g);}return Promise.all(e).then(function(h){return{totalCount:a,items:h};}.bind(this));},parseTotalCount:function(d){if(d.ItemLists&&d.ItemLists[0]&&d.ItemLists[0].TotalCount){return d.ItemLists[0].TotalCount.Value;}return 0;},addGeoDataIfAvailable:function(a){var l,b;for(var i=0;i<a.$$ResultItemAttributes$$.length;i++){if(a.$$ResultItemAttributes$$[i].Name==="LATITUDE_AD"){l=a.$$ResultItemAttributes$$[i].Value;}if(a.$$ResultItemAttributes$$[i].Name==="LONGITUDE_AD"){b=a.$$ResultItemAttributes$$[i].Value;}}if(l&&b){var v='{ "type": "Point", "coordinates": ['+b+', '+l+', 0] }';var n={Name:"LOC_4326",Value:v,ValueFormatted:v};a.$$ResultItemAttributes$$.push(n);var d={Name:"LOC_4326",DataType:"GeoJson",Description:"LOC_4326",Digits:0,FractDigits:0,IsBoolean:false,IsKey:false,IsSortable:true,SemanticObjectType:"",ValueFalse:"",ValueTrue:"",accessUsage:["FreestyleSearch"],correspondingSearchAttributeName:"",presentationUsage:["Detail"]};a.$$AttributeMetadata$$.push(d);}return a;},parseItem:function(a){var b=[];var d=[];var s=[];var e=this.sina.getDataSource(a.$$DataSourceMetaData$$[0].ObjectName);for(var j=0;j<a.$$ResultItemAttributes$$.length;++j){var f=a.$$ResultItemAttributes$$[j];var m=e.getAttributeMetadata(f.Name);var g=this.sina._createSearchResultSetItemAttribute({id:f.Name,label:e.getAttributeMetadata(f.Name).label,value:t.ina2Sina(m.type,f.Value),valueFormatted:f.ValueFormatted||f.Value,valueHighlighted:f.ValueFormatted||f.Value,isHighlighted:false,metadata:m});g=u.addPotentialNavTargetsToAttribute(this.sina,g);if(m.usage.Title){b.push(g);}if(m.usage.Detail){d.push(g);}for(var k=0;k<a.$$AttributeMetadata$$.length;k++){var h=a.$$AttributeMetadata$$[k];if(h.Name==f.Name){if(h.SemanticObjectType&&h.SemanticObjectType.length>0){s.push({name:h.SemanticObjectType,value:g.value,type:g.metadata.type});}break;}}}b.sort(function(A,B){return A.metadata.usage.Title.displayOrder-B.metadata.usage.Title.displayOrder;});d.sort(function(A,B){return A.metadata.usage.Detail.displayOrder-B.metadata.usage.Detail.displayOrder;});this.parseWhyFound(e,b,d,a);var l=[];var n=[];for(var i=0;i<b.length;++i){var o=b[i];l.push(o.valueFormatted);n.push(o.valueHighlighted);}l=l.join(' ');n=n.join(' ');var q;for(var k=0;k<a.$$RelatedActions$$.length;++k){var r=a.$$RelatedActions$$[k];if(r.Type==="GeneralUri"||r.Type==="SAPNavigation"){var v=r.Description;var w=encodeURI(r.Uri);q=this.sina._createNavigationTarget({label:v,targetUrl:w});}}var x=a.$$DataSourceMetaData$$[0].SemanticObjectType;var y=a.$$DataSourceMetaData$$[0].SystemId;var z=a.$$DataSourceMetaData$$[0].Client;return this.intentsResolver.resolveIntents({semanticObjectType:x,semanticObjectTypeAttributes:s,systemId:y,client:z,fallbackDefaultNavigationTarget:q}).then(function(A){var B=A&&A.defaultNavigationTarget;var C=A&&A.navigationTargets;var D=this.sina._createSearchResultSetItem({dataSource:e,title:l,titleHighlighted:n,titleAttributes:b,detailAttributes:d,defaultNavigationTarget:B,navigationTargets:C});return D;}.bind(this));},parseWhyFound:function(d,a,b,e){var i,w,f,j,g;for(i=0;i<e.$$WhyFound$$.length;i++){w=e.$$WhyFound$$[i];f=this.getResponseAttributeId(d,w.Name);for(j=0;j<a.length;++j){g=a[j];if(f===g.id){w.matched=true;g.valueHighlighted=w.Value;g.isHighlighted=true;break;}}for(j=0;j<b.length;++j){g=b[j];if(f===g.id){w.matched=true;g.valueHighlighted=w.Value;g.isHighlighted=true;break;}}}for(i=0;i<e.$$WhyFound$$.length;i++){w=e.$$WhyFound$$[i];if(w.matched){continue;}f=this.getResponseAttributeId(d,w.Name);var m=d.getAttributeMetadata(f);if(!m){throw new c.Exception('metadata misssing for '+f);}g=this.sina._createSearchResultSetItemAttribute({id:m.id,label:m.label,value:null,valueFormatted:u.filterString(w.Value,['<b>','</b>']),valueHighlighted:w.Value,isHighlighted:true,metadata:m});b.push(g);}},getResponseAttributeId:function(d,r){var a;var b=this.provider.getInternalMetadataAttribute(d,r);if(!b){return r;}var e=this.provider.getInternalMetadataAttribute(d,b.correspondingSearchAttributeName);if(!e){return r;}return e.Name;}});});