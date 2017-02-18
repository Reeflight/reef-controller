'use strict';
import * as firebase from "firebase";
import PubSubLoader from './../internals/pub-sub-loader.js';
PubSubLoader();
export default class FirebaseController {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCxBWJTjZ822a_0bxGbTJV3F1dZoQVFo1w",
      authDomain: "reeflight-fb71e.firebaseapp.com",
      databaseURL: "https://reeflight-fb71e.firebaseio.com"
    };
    firebase.initializeApp(config);
    global.firebase = firebase;
  }

};
