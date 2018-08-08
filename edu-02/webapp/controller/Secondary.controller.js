sap.ui.define([
    "edu-02/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("edu-02.controller.Secondary", {
        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("appSecondary").attachMatched(this._onRouteMatched, this);
		    },
        _onRouteMatched: function (oEvent) {
            var oData = oEvent.getParameter("arguments").input;
            this.getView().byId("textArea").setText(oData);

            this.getView().byId("anotherTextArea").setText(justChecking);
		    }
    });
});
