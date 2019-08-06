sap.ui
    .define(
        ["mfdemo_new/Controller/BaseController", 'sap/m/Popover'],
        function (BaseController, Popover) {
            "use strict";
            return BaseController
                .extend(
                    "mfdemo_new.Controller.app", {


                        onInit: function () {
                            var usrlgndata = {
                                user_visible: false
                            };
                            this._adjustNavItems(false, this._lgndata);
                            this._adjustButtons(usrlgndata);

                        },
                        handleUserNamePress: function (oEvent) {


                            // create popover
                            if (!this._oPopover) {
                                this._oPopover = sap.ui.xmlfragment("simple_hello.view.usrpopover", this);
                                this.getView().addDependent(this._oPopover);

                            }

                            // delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
                            var oButton = oEvent.getSource();
                            jQuery.sap.delayedCall(0, this, function () {
                                this._oPopover.openBy(oButton);
                            });

                        },

                        handleLogoutPress: function () {

                            var data = {};
                            this._oPopover.close();

                            this._adjustNavItems(false, this._lgndata);

                            data.user_visible = false;
                            this._adjustButtons(data);

                            var oRouter = this.getRouter();
                            oRouter.navTo("login");



                        },



                        onItemSelect: function (oEvent) {
                            var item = oEvent.getParameter('item');
                            var selkey = item.getKey();
                            var oRouter = this.getRouter();
                            oRouter.navTo(selkey);
                        },

                        onSideNavButtonPress: function () {
                            var viewId = this.getView().getId();
                            var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
                            var sideExpanded = toolPage.getSideExpanded();
                            toolPage.setSideExpanded(!toolPage.getSideExpanded());
                        },





                    });
        });