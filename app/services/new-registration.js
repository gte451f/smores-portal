import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * the camper attending camp
   */
  camper: null,

  /**
   * how many sessions will the camper attend?
   * single = 0
   * multi = 0
   */
  mode: 0,

  /**
   * anything the parent wants to say to camp staff about this registration
   */
  registrationNote: null,

  /**
   * array of requests the camper asks for
   */
  requests: [],

  /**
   * store a marker for session type persistence across wizard steps
   * use this token to detect restarts
   */
  wizardToken: 'start',

  /**
   * reset a registration back to its original state
   */
    resetRegistration(){
    this.set('camper', null);
    this.set('mode', 0);
    this.set('registrationNote', null);
    this.set('requests', []);
  }

});
