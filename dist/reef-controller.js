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

let running = false;
let worker;
class Tasks {
  constructor() {
    this.tasks = [];
  }
  add(task) {
    this.runWorker(task);
  }
  runWorker(task) {
    if (running) {
      worker.send({ type: 'kill' });
    }
    worker = child_process.fork(path.join(__dirname, 'workers/profile-worker.js'));
    worker.on('message', ({ type, data }) => {
      if (type === 'done') {}
    });
    worker.send({ type: 'start', data: task });
    running = true;
  }
}
var tasksController = new Tasks();

class ChannelController extends FirebaseController {
  constructor(channels = 3) {
    super();
    async function gen(_this) {
      try {
        const udid = 'uid01';
        const url = `users/Plr4JUix6xPxWmai0PlDRL34qJ32`;
        const ref = url => {
          return firebase.database().ref(url);
        };
        ref(`${url}/devices/${udid}`).on('value', snapshot => {
          let { lanes, profileId } = snapshot.val();
          ref(`${url}/profiles/${profileId}`).on('value', snapshot => {
            let profile = snapshot.val();
            tasksController.add({ profile: profile, uid: '01' });
          });
        });
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
