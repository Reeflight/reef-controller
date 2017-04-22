'use strict';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';
const I2c = new I2cController();

export default class ChannelController extends FirebaseController {

  // static get properties() {
  //   return {
  //     data: {
  //
  //     }
  //   }
  // }

  constructor(channels=4) {
    super();
    const udid = 'uid01';
    const url = `users/XpsE3FKDooeYDJwkxES9JLG8BPZ2`;
    const {lanes, puid} = this.getDevice(`${url}/devices/${udid}`);
    const profile = this.getProfile(`${url}/profiles/${puid}`);
    
    for (let lane = 1; lane <= lanes.length; lane++){
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
  
  getProfile(url) {
    firebase.database().ref(url).on('value', snapshot => {
      const data = snapshot.val();
      return data;
    });
  }
  
  getDevice(url) {
    firebase.database().ref(url).on('value', snapshot => {
      const data = snapshot.val();
      return {
        lanes: data.lanes,
        puid: data.profile
      };
    });
  }
}

