'use strict';
const i2c = require('i2c');
export default class {
  constructor() {
    let address = 0x00; // set address to 0x0F
    try {
      let wire = new i2c(address, {device: '/dev/i2c-1'});
      wire.scan((err, data) => {
	console.log(data);
	wire.setAddress(data[0]);
      });
      this.wire = wire;
    } catch (e) {
      this.wire = undefined;
      console.warn('RPI not found on address: ' + this.address);
    }
  }
  write(byte) {
    console.log('writing byte', byte);
    if (this.wire)
      this.wire.writeByte(byte, err => {
        console.log("error is ", err);
      });
  }
}
