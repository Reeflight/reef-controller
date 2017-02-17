'use strict';
import * as firebase from "firebase";
const Emitter = require('events');
const emitter = new Emitter();

export default class FirebaseController {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCxBWJTjZ822a_0bxGbTJV3F1dZoQVFo1w",
      authDomain: "reeflight-fb71e.firebaseapp.com",
      databaseURL: "https://reeflight-fb71e.firebaseio.com"
    };
    firebase.initializeApp(config);
    emitter.emit('firebase-ready');
  }
  on(event, cb) {
    emitter.on(event, data => {
      return cb(data);
    })
  }
};
