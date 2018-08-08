sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";
    return Controller.extend("edu-01.controller.AnotherView", {
        onInit: function(){
            sap.ui.getCore().getEventBus().subscribe("myChannel","handleLiveChange", this.handleLiveChangeRecieved, this);
        },
        handleLiveChangeRecieved: function(channel, event, data) {
            this.getView().byId("AnotherText").setText(data);
        }
    });
});

