'use strict';

var firebase = require('firebase');

/**
 * PubSub
 */
var PubSub = class {

  /**
   * Creates handlers
   */
  constructor() {
    this.handlers = [];
  }

  /**
   * @param {String} event
   * @param {Method} handler
   * @param {HTMLElement} context
   */
  subscribe(event, handler, context) {
    if (typeof context === 'undefined') {
      context = handler;
    }
    this.handlers.push({event: event, handler: handler.bind(context)});
  }

  /**
   * @param {String} event
   * @param {String|Number|Boolean|Object|Array} value
   */
  publish(event, value) {
    for (let i = 0; i < this.handlers.length; i++) {
      if (this.handlers[i].event === event) {
        this.handlers[i].handler(value, this.handlers[i].oldValue);
				this.handlers[i].oldValue = value;
      }
    }
  }
};

var PubSubLoader = () => {
  global.PubSub = global.PubSub || new PubSub();
};

PubSubLoader();
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
    // PubSub.publish('firebase.ready', {ready: true});
  }

}

const i2c$1 = require('i2c');
var I2cController = class {
  constructor() {
    let address = 0x10; // set address to 0x10
    try {
      let wire = new i2c$1(address, {device: '/dev/i2c-1'});
      wire.scan();
      this.wire = wire;
    } catch (e) {
      this.wire = undefined;
      console.warn('RPI not found on address: ' + this.address);
    }
  }
  write(byte) {
    if (this.wire)
      this.wire.writeByte(byte, err => {
        console.log("error is ", err);
      });
  }
};

const i2c = new I2cController();
PubSubLoader();
var ReefController = class extends FirebaseController {
  constructor() {
    super();
    // PubSub.subscribe('firebase.ready', this.start);
    this.start();
  }
  get firebase() {
    return global.firebase;
  }
  start() {
    console.log('running');
    this.firebase.database().ref('users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/channel/').on('value', snapshot => {
      const data = snapshot.val();
      i2c.write(data);
    });
  }
};

new ReefController();
