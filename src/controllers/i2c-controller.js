'use strict';
const I2c = require('i2c');
export default class {
  constructor() {
    let address = 0x0F; // set address to 0x0F
    try {
      this.setWireAddress(address);
    } catch (e) {
      this.wire = undefined;
      console.warn('RPI not found on address: ' + this.address);
    }
  }
  write(address, byte0, byte1) {
    this.setWireAddress(address);
    if (this.wire)
      this.wire.write([byte0, byte1], err => {
         //console.log("error is ", err);
      });
      
  }
  setWireAddress(address) {
    let wire = new I2c(address, {device: '/dev/i2c-1'});
    this.wire = wire;
  }
}
