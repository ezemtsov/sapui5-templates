sap.ui.define(["./common.constants","./common.boot.path","./common.debug.mode"],function(c,b,d){"use strict";return l;function l(){["/sap/ushell/bootstrap/core-min-0","/sap/ushell/bootstrap/core-min-1","/sap/ushell/bootstrap/core-min-2","/sap/ushell/bootstrap/core-min-3"].map(function(f){return b+f+(d?"-dbg":"")+".js";}).forEach(L);}function L(f,i){var s=document.createElement("script");if(i){s.id=i;}s.src=f;s.async=false;document.head.appendChild(s);}});