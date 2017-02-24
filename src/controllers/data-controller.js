'use strict';
import Backed from 'backed';
import FirebaseController from './firebase-controller.js';
import I2cController from './i2c-controller.js';
const i2c = new I2cController();

export default Backed(class DataController extends FirebaseController {

  // static get properties() {
  //   return {
  //     data: {
  //
  //     }
  //   }
  // }

  constructor() {
    super();

    this.firebase.database().ref('users/XpsE3FKDooeYDJwkxES9JLG8BPZ2/channel/').on('value', snapshot => {
      const data = snapshot.val();
      i2c.write(data);
    });
  }

  get firebase() {
    return global.firebase;
  }
});
