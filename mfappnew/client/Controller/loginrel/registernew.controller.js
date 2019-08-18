sap.ui.define(['mfdemo_new/Controller/BaseController'], function(
  BaseController
) {
  'use strict';

  var _oStorage, _oMessageStrip, _oView;

  return BaseController.extend('mfdemo_new.controller.loginrel.register', {
    onInit: function() {
      this._oMessageStrip = this.getView().byId('msgstrp');
      this._oView = this.getView();
      this.router = this.getRouter();
    },

    _generateMsgStrip: function(msgtext, visible) {
      if (this._oMessageStrip) {
        this._oMessageStrip.setVisible(visible);
        this._oMessageStrip.setText(msgtext);
      }
    },

    _destroyMsgStrip: function(visible) {
      if (this._oMessageStrip) {
        this._oMessageStrip.setVisible(visible);
        //
      }
    },

    onSubmit: function(oEvt) {
      var password = this._oView.byId('pwd_ip').getValue();
      var email = this._oView.byId('email_ip').getValue();
      var cpassword = this._oView.byId('cpwd_ip').getValue();

      //                                        	var pwdStrength = this._checkpwd(password);

      // Validate the email address using email regex
      if (this._validateEmail(email) === false) {
        this._generateMsgStrip('Invalid email id please check', true);
      }
      // Check if username and password fields are not empty
      else if (password === '') {
        this._generateMsgStrip('Please enter your password', true);
      }
      // Check if password and confirm password fields match
      else if (password !== cpassword) {
        this._generateMsgStrip(
          'Password and confirm password fields do not match. Please check and re-enter them',
          true
        );
        this._oView.byId('pwd_ip').setValue('');
        this._oView.byId('cpwd_ip').setValue('');
      }

      // Pass the input to server for database insert
      else {
        // this._oView.byId('user_ip').setValue('');
        this._oView.byId('pwd_ip').setValue('');
        this._oView.byId('cpwd_ip').setValue('');
        // this._oView.byId('name_ip').setValue('');
        this._oView.byId('email_ip').setValue('');
        this._destroyMsgStrip(false);

        // Call firebase method to login via email and password
        this.createUserInFirebase(email, password);
      }
    },

    createUserInFirebase: function(email, password) {
      var that = this;

      // Get the fireauth model bound to the component
      const fireauth = this.getView()
        .getModel('firebase')
        .getProperty('/fireAuth');

      fireauth
        .createUserWithEmailAndPassword(email, password)
        .then(function(data) {
          console.log('User created successfully');
          that.getRouter().navTo('/login');
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          that._generateMsgStrip(errorMessage, true);
        });
    },

    onRefresh: function() {
      this._destroyMsgStrip(false);
      // this._oView.byId('name_ip').setValue('');
      this._oView.byId('email_ip').setValue('');
      // this._oView.byId('user_ip').setValue('');
      this._oView.byId('pwd_ip').setValue('');
      this._oView.byId('cpwd_ip').setValue('');
    },

    _validateEmail: function(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    _checkpwd: function(pwd) {
      if (/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8}$/.test(pwd)) {
        return 'pwdOK';
      } else {
        return 'insuffpwd';
      }
    }
  });
});
