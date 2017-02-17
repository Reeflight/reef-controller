'use strict';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';

export default class extends FirebaseController {
  constructor() {
    super();
    this.start();
  }
  start() {
    firebase.database.ref('users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/channel').on('value', snapshot => {
      const data =  snapshot.val();
      I2cController(data);
    });
  }
};
