sap.ui.define(
  [
    'mfdemo_new/Controller/BaseController',
    'sap/m/MessageToast',
    'sap/m/Popover',
    'sap/m/Button',
    'sap/m/MessageStrip',
    'sap/m/MessageToast'
  ],
  function(BaseController, MessageToast, Popover, Button, MessageStrip) {
    return BaseController.extend('mfdemo_new.Controller.loginrel.loginnew', {
      onInit: function() {
        this._oMessageStrip = this.getView().byId('msgstrp');
        var oFlexBox = this.getView().byId('MainFlexBox');
        this.sParentId = oFlexBox.getIdForLabel();
      },

      onBeforeRendering: function() {
        this._destroyMsgStrip(false);
      },

      onSubmit: function(oEvt) {
        var viewId = this.getView().getId();
        var username = this.getView()
          .byId('user_ip')
          .getValue();
        var password = this.getView()
          .byId('pwd_ip')
          .getValue();

        if (username === '' || password === '') {
          this._generateMsgStrip('Please provide username and password');
        } else {
          // this.getView().byId("user_ip").setValue("");
          // this.getView().byId("pwd_ip").setValue("");
          // //                                        		this._destroyMsgStrip();
          // var data = {
          //     username: username,
          //     password: password
          // }
          // this._loginrestcall(data);
        }
      },
      onRefresh: function() {
        this._destroyMsgStrip(false);
        this.getView()
          .byId('user_ip')
          .setValue('');
        this.getView()
          .byId('pwd_ip')
          .setValue('');
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
      _loginrestcall: function(logdata) {
        var authurl = 'http://localhost:3000/users/authenticate';
        var that = this;

        $.ajax({
          url: authurl,
          type: 'POST',
          data: logdata,
          dataType: 'json',
          success: function(data) {
            that._loginsuccess(data, that);
            var msgstrp = that.getView().byId('pageContainer');
          },
          error: function(err) {
            that._loginfailure(err, that);
            var msgstrp = view.byId('msgstrp');
          }
        }); //AJAX call close
      },
      _loginsuccess: function(data, that) {
        if (data.success === false) {
          // Error with login, display message
          that._generateMsgStrip(data.msg, true);
          //                                				MessageToast.show(data.msg);
        }
        // Successful login, navigate to profile page
        else {
          MessageToast.show('Welcome ' + data.user.name);
          that._destroyMsgStrip(false);

          that._putAuthtoken(data.token);

          data.user_visible = true;
          this.getOwnerComponent()._adjustButtons(data);

          this.getOwnerComponent()._adjustNavItems(true);

          // Store the logged in user data
          var loginuser = this.getView().getModel('loggedin_user');
          loginuser.setData(data);
          loginuser.updateBindings();

          // Navigate to route
          var oRouter = that.getRouter();
          var oTargets = this.getRouter().getTargets();
          //                                				oTargets.display("dashboard");
          oRouter.navTo('dashboard');
        }
      },
      _loginfailure: function(err, that) {
        that._generateMsgStrip('Incorrect UserID or password', true);
      }
    });
  }
);
