sinaDefine(['../core/core','./ResultSetItem'],function(c,R){return R.derive({_meta:{properties:{dimensionValueFormatted:{required:true},measureValue:{required:true},measureValueFormatted:{required:true}}},toString:function(){return this.dimensionValueFormatted+':'+this.measureValueFormatted;}});});