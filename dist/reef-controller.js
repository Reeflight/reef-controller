'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var firebase$1 = require('firebase');
var backedLogger = _interopDefault(require('backed-logger'));
var child_process = require('child_process');
var path = _interopDefault(require('path'));

class FirebaseController {
  constructor() {
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
    let address = 0x1F;
    try {
      this.setWireAddress(address);
    } catch (e) {
      this.wire = undefined;
      console.warn('RPI not found on address: ' + this.address);
    }
  }
  write(byte0, byte1) {
    if (this.wire) this.wire.write([byte0, byte1], err => {
    });
  }
  setWireAddress(address) {
    console.log('set address:', address);
    let wire = new I2c$1(address, { device: '/dev/i2c-1' });
    this.wire = wire;
  }
};

class Tasks {
  constructor() {
    this.tasks = [];
  }
  add(task) {
    this.runWorker(task);
  }
  runWorker(task) {
    const worker = child_process.fork(path.join(__dirname, 'workers/profile-worker.js'));
    worker.on('message', ({ type, data }) => {
      if (type === 'done') {}
    });
    worker.send({ type: 'start', data: task });
  }
}
var tasksController = new Tasks();

const I2c = new I2cController();
class ChannelController extends FirebaseController {
  constructor(channels = 3) {
    super();
    async function gen(_this) {
      try {
        const udid = 'uid01';
        const url = `users/XpsE3FKDooeYDJwkxES9JLG8BPZ2`;
        const { lanes, profileId } = await _this.getFireData(`${url}/devices/${udid}`);
        const profile = await _this.getFireData(`${url}/profiles/${profileId}`);
        tasksController.add({ profile: profile, uid: '01' });
      } catch (error) {
        throw console.error(error);
      }
    }
    gen(this);
  }
  getFireData(url) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(url).on('value', snapshot => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
}

var ReefController = class extends ChannelController {
  constructor() {
    super();
  }
};

new ReefController();
//# sourceMappingURL=reef-controller.js.map
