'use strict';

var firebase = require('firebase');

class FirebaseController {
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

}

const i2c$1 = require('i2c');
var I2cController = class {
  constructor() {
    let address = 0x00; // set address to 0x0F
    try {
      let wire = new i2c$1(address, {device: '/dev/i2c-1'});
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
};

const i2c = new I2cController();
var ReefController = class extends FirebaseController {
  constructor() {
    super();
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

new ReefController();
//# sourceMappingURL=reef-controller.js.map
