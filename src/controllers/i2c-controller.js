'use strict';
export default class {
  constructor() {
    const i2c = require('i2c');
    let address = 0x10; // set address to 0x10
    let wire = new i2c(address, {device: '/dev/i2c-1'});


  }
  write(byte) {
    wire.writeByte(byte, err => {
      console.log("error is ", err);
    });
  }
}
