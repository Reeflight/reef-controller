'use strict';
import FirebaseController from './firebase-controller.js';

export default class extends FirebaseController {
  constructor() {
    const i2c = require('i2c');
    let address = 0x10; // set address to 0x10
    let wire = new i2c(address, {device: '/dev/i2c-1'});


    wire.writeByte(1, err => {
      console.log("error is ", err);
    });
  }
};
