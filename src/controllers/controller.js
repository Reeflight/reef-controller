'use strict';
import Backed from 'backed';
import FirebaseController from './firebase-controller.js'

export default Backed(class extends FirebaseController {
  
  constructor() {
    super();
    
  }
  
  get firebase() {
    return global.firebase;
  }
  
});