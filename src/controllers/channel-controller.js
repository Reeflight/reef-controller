'use strict';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';
import tasksController from './tasks-controller.js'
const I2c = new I2cController();

export default class ChannelController extends FirebaseController {
  constructor(channels=3) {
    super();
    async function gen(_this) {
      try {
        const udid = 'uid01';
        const url = `users/XpsE3FKDooeYDJwkxES9JLG8BPZ2`;
        const {lanes, profileId} = await _this.getFireData(`${url}/devices/${udid}`);
        const profile = await _this.getFireData(`${url}/profiles/${profileId}`);
        
        tasksController.add({profile: profile, uid: '01'});
        
/*        for (let lane of lanes ) {
          if (typeof lane === 'object') {
            let laneIndex = lanes.indexOf(lane);
            console.log('lane', lanes.indexOf(lane));
            for (let channel of lane.channels) {
              console.log('channel:', channel, channels.indexOf(channel));
              let channelIndex = channels.indexOf(channel);
              const data = await _this.getFireData(`${url}/devices/${udid}/lanes/${laneIndex}/channels/${channelIndex}`);
              I2c.setWireAddress(lane);
              I2c.write(channelIndex+1, data);
              // firebase.database().ref(url).on('value', snapshot => {
              //   I2c.write(channel+1, snapshot.val());
              //   console.log(channel+1, snapshot.val());
              // });
            }
          }
        }*/
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

