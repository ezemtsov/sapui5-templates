sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function(Controller) {
    "use strict";
    return Controller.extend("edu-01.controller.OneView", {
        handleLiveChange: function(oEvent){
            var oInput = this.getView().byId("myInputArea").getValue();
            sap.ui.getCore().getEventBus().publish("myChannel", "handleLiveChange", oInput);
        }
    });
});
