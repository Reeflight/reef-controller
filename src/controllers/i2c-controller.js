'use strict';
const I2c = require('i2c');
export default class {
  constructor() {
    let address = 0x1F; // set address to 0x0F
    try {
      this.setWireAddress(address);
    } catch (e) {
      this.wire = undefined;
      console.warn('RPI not found on address: ' + this.address);
    }
  }
  write(byte0, byte1) {
     //console.log('writing byte', byte0, ' ', byte1);

    if (this.wire)
      this.wire.write([byte0, byte1], err => {

         //console.log("error is ", err);
      });
  }
  setWireAddress(address) {
    console.log('set address:', address);
    let wire = new I2c(address, {device: '/dev/i2c-1'});
    this.wire = wire;
  }
}
