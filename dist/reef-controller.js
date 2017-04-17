'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Backed = _interopDefault(require('backed'));
var firebase$1 = require('firebase');

class FirebaseController {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCxBWJTjZ822a_0bxGbTJV3F1dZoQVFo1w",
      authDomain: "reeflight-fb71e.firebaseapp.com",
      databaseURL: "https://reeflight-fb71e.firebaseio.com"
    };
    firebase$1.initializeApp(config);
    global.firebase = firebase$1;
  }

}

const I2c$1 = require('i2c');
var I2cController = class {
  constructor() {
    let address = 0x0F; // set address to 0x0F
    try {
      let wire = new I2c$1(address, {device: '/dev/i2c-1'});
      this.wire = wire;
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
};

const I2c = new I2cController();

var ChannelController = Backed(class ChannelController extends FirebaseController {

  // static get properties() {
  //   return {
  //     data: {
  //
  //     }
  //   }
  // }

  constructor(channels=4, lanes=3) {
    const udid = 'uid01';
    super();
    for (let lane = 1; lane <= lanes; lane++){
      for (let i = 1; i <= channels; i++) {
      let url = `users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/devices/${udid}/lanes/${lane}/channels/${i}`;
      
        console.log(url);
        firebase.database().ref(url).on('value', snapshot => {
          
          I2c.write(i, snapshot.val());
          console.log(i, snapshot.val());
        });
      }
    }
    
    
  }
});

var ReefController = class extends ChannelController {
  constructor() {
    super();
  }
};

new ReefController();
