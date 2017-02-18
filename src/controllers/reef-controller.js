'use strict';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';
import PubSubLoader from './../internals/pub-sub-loader.js';
const i2c = new I2cController();
PubSubLoader();
export default class extends FirebaseController {
  constructor() {
    super();
    // PubSub.subscribe('firebase.ready', this.start);
    this.start();
  }
  get firebase() {
    return global.firebase;
  }
  start() {
    this.firebase.database().ref('users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/channel/').on('value', snapshot => {
      const data = snapshot.val();
      i2c.write(data);
    });
  }
};
