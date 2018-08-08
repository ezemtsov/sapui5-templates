(function(){var u;if(u=tinyMCEPopup.getParam("media_external_list_url"))document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(u)+'"></script>');function g(i){return document.getElementById(i);}function c(o){var i,l,b,d;if(null==o||"object"!=typeof o)return o;if('length'in o){b=[];for(i=0,l=o.length;i<l;++i){b[i]=c(o[i]);}return b;}b={};for(d in o){if(o.hasOwnProperty(d))b[d]=c(o[d]);}return b;}function a(i){var e=g(i);if(e.nodeName=="SELECT")return e.options[e.selectedIndex].value;if(e.type=="checkbox")return e.checked;return e.value;}function s(i,v,n){if(typeof(v)!='undefined'&&v!=null){var e=g(i);if(e.nodeName=="SELECT")selectByValue(document.forms[0],i,v);else if(e.type=="checkbox"){if(typeof(v)=='string'){v=v.toLowerCase();v=(!n&&v==='true')||(n&&v===n.toLowerCase());}e.checked=!!v;}else e.value=v;}}window.Media={init:function(){var h,e,b=this;b.editor=e=tinyMCEPopup.editor;g('filebrowsercontainer').innerHTML=getBrowserHTML('filebrowser','src','media','media');g('qtsrcfilebrowsercontainer').innerHTML=getBrowserHTML('qtsrcfilebrowser','quicktime_qtsrc','media','media');g('bgcolor_pickcontainer').innerHTML=getColorPickerHTML('bgcolor_pick','bgcolor');g('video_altsource1_filebrowser').innerHTML=getBrowserHTML('video_filebrowser_altsource1','video_altsource1','media','media');g('video_altsource2_filebrowser').innerHTML=getBrowserHTML('video_filebrowser_altsource2','video_altsource2','media','media');g('audio_altsource1_filebrowser').innerHTML=getBrowserHTML('audio_filebrowser_altsource1','audio_altsource1','media','media');g('audio_altsource2_filebrowser').innerHTML=getBrowserHTML('audio_filebrowser_altsource2','audio_altsource2','media','media');g('video_poster_filebrowser').innerHTML=getBrowserHTML('filebrowser_poster','video_poster','image','media');h=b.getMediaListHTML('medialist','src','media','media');if(h=="")g("linklistrow").style.display='none';else g("linklistcontainer").innerHTML=h;if(isVisible('filebrowser'))g('src').style.width='230px';if(isVisible('video_filebrowser_altsource1'))g('video_altsource1').style.width='220px';if(isVisible('video_filebrowser_altsource2'))g('video_altsource2').style.width='220px';if(isVisible('audio_filebrowser_altsource1'))g('audio_altsource1').style.width='220px';if(isVisible('audio_filebrowser_altsource2'))g('audio_altsource2').style.width='220px';if(isVisible('filebrowser_poster'))g('video_poster').style.width='220px';e.dom.setOuterHTML(g('media_type'),b.getMediaTypeHTML(e));b.setDefaultDialogSettings(e);b.data=c(tinyMCEPopup.getWindowArg('data'));b.dataToForm();b.preview();updateColor('bgcolor_pick','bgcolor');},insert:function(){var e=tinyMCEPopup.editor;this.formToData();e.execCommand('mceRepaint');tinyMCEPopup.restoreSelection();e.selection.setNode(e.plugins.media.dataToImg(this.data));tinyMCEPopup.close();},preview:function(){g('prev').innerHTML=this.editor.plugins.media.dataToHtml(this.data,true);},moveStates:function(t,f){var d=this.data,e=this.editor,m=e.plugins.media,b,h,j,k,h;k={quicktime_autoplay:true,quicktime_controller:true,flash_play:true,flash_loop:true,flash_menu:true,windowsmedia_autostart:true,windowsmedia_enablecontextmenu:true,windowsmedia_invokeurls:true,realmedia_autogotourl:true,realmedia_imagestatus:true};function p(i){var o={};if(i){tinymce.each(i.split('&'),function(n){var q=n.split('=');o[unescape(q[0])]=unescape(q[1]);});}return o;};function l(n,o){var i,q,r,v,w;if(n==d.type||n=='global'){o=tinymce.explode(o);for(i=0;i<o.length;i++){q=o[i];r=n=='global'?q:n+'_'+q;if(n=='global')w=d;else if(n=='video'||n=='audio'){w=d.video.attrs;if(!w&&!t)d.video.attrs=w={};}else w=d.params;if(w){if(t){s(r,w[q],n=='video'||n=='audio'?q:'');}else{delete w[q];v=a(r);if((n=='video'||n=='audio')&&v===true)v=q;if(k[r]){if(v!==k[r]){v=""+v;w[q]=v;}}else if(v){v=""+v;w[q]=v;}}}}}}if(!t){d.type=g('media_type').options[g('media_type').selectedIndex].value;d.width=a('width');d.height=a('height');h=a('src');if(f=='src'){b=h.replace(/^.*\.([^.]+)$/,'$1');if(j=m.getType(b))d.type=j.name.toLowerCase();s('media_type',d.type);}if(d.type=="video"||d.type=="audio"){if(!d.video.sources)d.video.sources=[];d.video.sources[0]={src:a('src')};}}g('video_options').style.display='none';g('audio_options').style.display='none';g('flash_options').style.display='none';g('quicktime_options').style.display='none';g('shockwave_options').style.display='none';g('windowsmedia_options').style.display='none';g('realmedia_options').style.display='none';g('embeddedaudio_options').style.display='none';if(g(d.type+'_options'))g(d.type+'_options').style.display='block';s('media_type',d.type);l('flash','play,loop,menu,swliveconnect,quality,scale,salign,wmode,base,flashvars');l('quicktime','loop,autoplay,cache,controller,correction,enablejavascript,kioskmode,autohref,playeveryframe,targetcache,scale,starttime,endtime,target,qtsrcchokespeed,volume,qtsrc');l('shockwave','sound,progress,autostart,swliveconnect,swvolume,swstretchstyle,swstretchhalign,swstretchvalign');l('windowsmedia','autostart,enabled,enablecontextmenu,fullscreen,invokeurls,mute,stretchtofit,windowlessvideo,balance,baseurl,captioningid,currentmarker,currentposition,defaultframe,playcount,rate,uimode,volume');l('realmedia','autostart,loop,autogotourl,center,imagestatus,maintainaspect,nojava,prefetch,shuffle,console,controls,numloop,scriptcallbacks');l('video','poster,autoplay,loop,muted,preload,controls');l('audio','autoplay,loop,preload,controls');l('embeddedaudio','autoplay,loop,controls');l('global','id,name,vspace,hspace,bgcolor,align,width,height');if(t){if(d.type=='video'){if(d.video.sources[0])s('src',d.video.sources[0].src);h=d.video.sources[1];if(h)s('video_altsource1',h.src);h=d.video.sources[2];if(h)s('video_altsource2',h.src);}else if(d.type=='audio'){if(d.video.sources[0])s('src',d.video.sources[0].src);h=d.video.sources[1];if(h)s('audio_altsource1',h.src);h=d.video.sources[2];if(h)s('audio_altsource2',h.src);}else{if(d.type=='flash'){tinymce.each(e.getParam('flash_video_player_flashvars',{url:'$url',poster:'$poster'}),function(v,n){if(v=='$url')d.params.src=p(d.params.flashvars)[n]||d.params.src||'';});}s('src',d.params.src);}}else{h=a("src");if(h.match(/youtube\.com\/embed\/\w+/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';s('src',h);s('media_type',d.type);}else{if(h.match(/youtu\.be\/[a-z1-9.-_]+/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';h='http://www.youtube.com/embed/'+h.match(/youtu.be\/([a-z1-9.-_]+)/)[1];s('src',h);s('media_type',d.type);}if(h.match(/youtube\.com(.+)v=([^&]+)/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';h='http://www.youtube.com/embed/'+h.match(/v=([^&]+)/)[1];s('src',h);s('media_type',d.type);}}if(h.match(/video\.google\.com(.+)docid=([^&]+)/)){d.width=425;d.height=326;d.type='flash';h='http://video.google.com/googleplayer.swf?docId='+h.match(/docid=([^&]+)/)[1]+'&hl=en';s('src',h);s('media_type',d.type);}if(h.match(/vimeo\.com\/([0-9]+)/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';h='http://player.vimeo.com/video/'+h.match(/vimeo.com\/([0-9]+)/)[1];s('src',h);s('media_type',d.type);}if(h.match(/stream\.cz\/((?!object).)*\/([0-9]+)/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';h='http://www.stream.cz/object/'+h.match(/stream.cz\/[^/]+\/([0-9]+)/)[1];s('src',h);s('media_type',d.type);}if(h.match(/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/)){d.width=425;d.height=350;d.params.frameborder='0';d.type='iframe';h='http://maps.google.com/maps/ms?msid='+h.match(/msid=(.+)/)[1]+"&output=embed";s('src',h);s('media_type',d.type);}if(d.type=='video'){if(!d.video.sources)d.video.sources=[];d.video.sources[0]={src:h};h=a("video_altsource1");if(h)d.video.sources[1]={src:h};h=a("video_altsource2");if(h)d.video.sources[2]={src:h};}else if(d.type=='audio'){if(!d.video.sources)d.video.sources=[];d.video.sources[0]={src:h};h=a("audio_altsource1");if(h)d.video.sources[1]={src:h};h=a("audio_altsource2");if(h)d.video.sources[2]={src:h};}else d.params.src=h;s('width',d.width||(d.type=='audio'?300:320));s('height',d.height||(d.type=='audio'?32:240));}},dataToForm:function(){this.moveStates(true);},formToData:function(f){if(f=="width"||f=="height")this.changeSize(f);if(f=='source'){this.moveStates(false,f);s('source',this.editor.plugins.media.dataToHtml(this.data));this.panel='source';}else{if(this.panel=='source'){this.data=c(this.editor.plugins.media.htmlToData(a('source')));this.dataToForm();this.panel='';}this.moveStates(false,f);this.preview();}},beforeResize:function(){this.width=parseInt(a('width')||(this.data.type=='audio'?"300":"320"),10);this.height=parseInt(a('height')||(this.data.type=='audio'?"32":"240"),10);},changeSize:function(t){var w,h,b,d;if(g('constrain').checked){w=parseInt(a('width')||(this.data.type=='audio'?"300":"320"),10);h=parseInt(a('height')||(this.data.type=='audio'?"32":"240"),10);if(t=='width'){this.height=Math.round((w/this.width)*h);s('height',this.height);}else{this.width=Math.round((h/this.height)*w);s('width',this.width);}}},getMediaListHTML:function(){if(typeof(tinyMCEMediaList)!="undefined"&&tinyMCEMediaList.length>0){var h="";h+='<select id="linklist" name="linklist" style="width: 250px" onchange="this.form.src.value=this.options[this.selectedIndex].value;Media.formToData(\'src\');">';h+='<option value="">---</option>';for(var i=0;i<tinyMCEMediaList.length;i++)h+='<option value="'+tinyMCEMediaList[i][1]+'">'+tinyMCEMediaList[i][0]+'</option>';h+='</select>';return h;}return"";},getMediaTypeHTML:function(e){function o(m,b){if(!e.schema.getElementRule(b||m)){return'';}return'<option value="'+m+'">'+tinyMCEPopup.editor.translate("media_dlg."+m)+'</option>'}var h="";h+='<select id="media_type" name="media_type" onchange="Media.formToData(\'type\');">';h+=o("video");h+=o("audio");h+=o("flash","object");h+=o("quicktime","object");h+=o("shockwave","object");h+=o("windowsmedia","object");h+=o("realmedia","object");h+=o("iframe");if(e.getParam('media_embedded_audio',false)){h+=o('embeddedaudio',"object");}h+='</select>';return h;},setDefaultDialogSettings:function(e){var d=e.getParam("media_dialog_defaults",{});tinymce.each(d,function(v,k){s(k,v);});}};tinyMCEPopup.requireLangPack();tinyMCEPopup.onInit.add(function(){Media.init();});})();