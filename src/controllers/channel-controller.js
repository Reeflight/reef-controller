'use strict';
import Backed from 'backed';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';
const I2c = new I2cController();

export default Backed(class ChannelController extends FirebaseController {

  // static get properties() {
  //   return {
  //     data: {
  //
  //     }
  //   }
  // }

  constructor(channels=4) {
    super();
    
    for (let i = 1; i <= channels; i++) {
      let url = `users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/channel${i}`;
      this.firebase.database().ref(url).on('value', snapshot => {
        I2c.write(i, snapshot.val());
      });
    }
    
  }


  get firebase() {
    return global.firebase;
  }
});

