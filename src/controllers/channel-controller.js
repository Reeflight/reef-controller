'use strict';
import FirebaseController from './firebase-controller.js';
//import I2cController from './i2c-controller.js';
import tasksController from './tasks-controller.js';
//const I2c = new I2cController();

export default class ChannelController extends FirebaseController {
  constructor(channels=3) {
    super();
    async function gen(_this) {
      try {
        const udid = 'uid01';
        const url = `users/Plr4JUix6xPxWmai0PlDRL34qJ32`;
        const ref = url => {
          return firebase.database().ref(url);
        };
        ref(`${url}/devices/${udid}`).on('value', snapshot => {
          let {lanes, profileId} = snapshot.val();
          ref(`${url}/profiles/${profileId}`).on('value', snapshot => {
            let profile = snapshot.val();
            tasksController.add({profile: profile, uid: '01'});
          });
        });
      }
      catch (error) {
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

