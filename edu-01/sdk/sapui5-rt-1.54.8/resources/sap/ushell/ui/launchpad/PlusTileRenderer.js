// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/resources'],function(r){"use strict";var P={};var t=r.i18n;P.render=function(R,c){R.write("<li");R.writeAttribute("tabindex","-1");R.writeControlData(c);R.addClass("sapUshellTile");R.addClass("sapUshellPlusTile");R.addClass("sapContrastPlus");R.addClass("sapMGT");R.writeClasses();R.writeAccessibilityState(c,{label:t.getText("TilePlus_label")});R.write(">");R.renderControl(c.oIcon);R.write("</li>");};return P;},true);