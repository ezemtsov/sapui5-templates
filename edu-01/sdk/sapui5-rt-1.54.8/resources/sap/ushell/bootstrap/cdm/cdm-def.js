sap.ui.define(["./cdm.constants","../common/common.configure.ui5","../common/common.configure.ushell","../common/common.override.registermodulepath","../common/common.load.core-min","../common/common.configure.ui5.extractLibs"],function(c,C,f,o,l,e){"use strict";var u=f({defaultUshellConfig:c.defaultConfig});C({libs:e(u),platform:"cdm"});o();l();});