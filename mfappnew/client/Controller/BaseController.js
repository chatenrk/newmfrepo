sap.ui
    .define(
        ["sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"],
        function (Controller, History) {
            "use strict";
            var _oRouter;
            var _lgndata;
            return Controller
                .extend(
                    "mfdemo_new.Controller.BaseController", {

                        onInit: function () {
                            this.ownerComponent = this.getOwnerComponent();
                        },

                        getRouter: function () {
                            return this.getOwnerComponent().getRouter();
                        },

                        getModel: function (modelName) {
                            return this.getOwnerComponent().getModel(modelName);
                        },

                        setModel: function (modelInstance, modelName) {
                            this.getOwnerComponent().setModel(modelInstance, modelName);
                        },


                        _adjustNavItems: function (usr_log_flag, lgndata) {


                            var nbar_model = this.getModel("navbar_model");
                            var data = nbar_model.getData();
                            var nview_model = new sap.ui.model.json.JSONModel();
                            var itms = [];



                            for (var i = 0; i < data.length; i++) {

                                // For the MF dashboard, append the user's name to the title
                                if (data[i].text === "MF Dashboard") {
                                    // Check if user login data is available
                                    if (lgndata && lgndata.user && lgndata.user.name !== '') {
                                        data[i].text == lgndata.user.name + "'s" + data[i].text;
                                    }
                                }

                                if (data[i].usr_log_flag === usr_log_flag) {
                                    itms.push(data[i]);
                                }




                            }



                            nview_model.setData(itms);
                            this.setModel(nview_model, "nview_model");
                        },

                        _adjustButtons: function (usrlgndata) {
                            var usrlgnmodel = this.getModel("usrlgn_model");
                            usrlgnmodel.setData(null);
                            usrlgnmodel.setData(usrlgndata);

                        },

                        /**
                         * @desc This method is a helper to get the value of the i18n text. This will used in Controller class
                         *       to get the data for rendering
                         * @param textname Name of the text which needs to be read
                         * @return textcontent Content of the text that is passed
                         */

                        _geti18ntext: function (textname) {



                            if (textname !== "") {
                                var textcontent = this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(textname);
                                return textcontent;
                            }


                        },
                        onNavBack: function (oEvent) {
                            var oHistory, sPreviousHash;
                            oHistory = History.getInstance();
                            sPreviousHash = oHistory
                                .getPreviousHash();

                            if (sPreviousHash !== undefined) {
                                window.history.go(-1);
                            } else {
                                this.getRouter().navTo(
                                    "appHome", {}, true
                                    /*
                                     * no
                                     * history
                                     */
                                );
                            }
                        }

                    });

        });