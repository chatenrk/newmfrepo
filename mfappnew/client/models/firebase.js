sap.ui.define(['sap/ui/model/json/JSONModel'], function(JSONModel) {
  'use strict';

  var firebaseConfig = {
    apiKey: 'AIzaSyAI8V0-gVOmAlzcexS1m_3fchNd3gQI2EQ',
    authDomain: 'newmfapp.firebaseapp.com',
    databaseURL: 'https://newmfapp.firebaseio.com',
    projectId: 'newmfapp',
    storageBucket: '',
    messagingSenderId: '1012405675141',
    appId: '1:1012405675141:web:a67a4e4204d40634'
  };

  return {
    initializeFirebase: function() {
      // Initialize Firebase with the Firebase-config
      firebase.initializeApp(firebaseConfig);

      // Create a Firestore reference
      //   const firestore = firebase.firestore();

      // Create a Authentication reference
      const fireAuth = firebase.auth();

      // Firebase services object
      const oFirebase = {
        // firestore: firestore,
        fireAuth: fireAuth
      };

      // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
      var fbModel = new JSONModel(oFirebase);

      // Return the Firebase Model
      return fbModel;
    }
  };
});
