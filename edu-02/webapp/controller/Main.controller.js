sap.ui.define([
    "edu-02/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("edu-02.controller.Main", {
        onInit: function() {
		    },
        onMainButtonPressed: function(oEvent) {
            var oInput = this.getView().byId("myInputArea").getValue();
            this.getRouter().navTo("appSecondary", { input: oInput });

            justChecking = oInput;
        }
    });
});
