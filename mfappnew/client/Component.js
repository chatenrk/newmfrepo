sap.ui.define(
  ['sap/ui/core/UIComponent', 'mfdemo_new/models/firebase'],

  function(UIComponent, Firebase) {
    'use strict';

    return UIComponent.extend('mfdemo_new.Component', {
      init: function() {
        var oJSONModel = new sap.ui.model.json.JSONModel();
        oJSONModel.loadData('models/navbar.json', '', false);
        this.setModel(oJSONModel, 'navbar_model');

        UIComponent.prototype.init.apply(this, arguments);

        // create the views based on the url/hash
        this.getRouter().initialize();

        // Import Firebase in the sap.ui.define
        // set the firebase model by calling the initializeFirebase function in the Firebase.js file
        this.setModel(Firebase.initializeFirebase(), 'firebase');

        // // Create a Fireauth reference
        // const fireAuth = this.getModel('firebase').getProperty('/fireAuth');

        // // Login the user anonymously
        // fireAuth.signInAnonymously().catch(function(error) {
        //   // Handle Errors here.
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        // });
      },

      metadata: {
        manifest: 'json'
      }

      // _adjustNavItems: function (usr_log_flag, lgndata) {

      //     var nbar_model = this.getModel("navbar_model");
      //     var data = nbar_model.getData();
      //     var nview_model = new sap.ui.model.json.JSONModel();
      //     var itms = [];

      //     // this._getlogindata();

      //     for (var i = 0; i < data.length; i++) {

      //         // For the MF dashboard, append the user's name to the title
      //         if (data[i].text === "MF Dashboard") {
      //             // Check if user login data is available
      //             if (lgndata && lgndata.user && lgndata.user.name !== '') {
      //                 data[i].text == lgndata.user.name + "'s" + data[i].text;
      //             }
      //         }

      //         if (data[i].usr_log_flag === usr_log_flag) {
      //             itms.push(data[i]);
      //         }

      //     }

      //     nview_model.setData(itms);
      //     this.setModel(nview_model, "nview_model");
      // },

      // _adjustButtons: function (usrlgndata) {
      //     var usrlgnmodel = this.getModel("usrlgn_model");
      //     usrlgnmodel.setData(null);
      //     usrlgnmodel.setData(usrlgndata);

      // },

      // _getlogindata: function () {
      //     /**
      //      * @desc This provides the login user information.
      //      * Data retrieved is bound to a global variable of the view
      //      */

      //     // Since this is being invoked from init(), we get the model from Owner Component

      //     var loginuser = this.getModel("loggedin_user");
      //     this._lgndata = loginuser.getData();
      // },
    });
  }
);
