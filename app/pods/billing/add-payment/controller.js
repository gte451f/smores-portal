import Ember from 'ember';


/**
 * lots of custom work to control the pages toggle rules
 */
export default Ember.Controller.extend({

  // file|new
  // tell the system which way to process card data
  mode: 'file',
  toggleText: 'Use New Card',

  actions: {
    /**
     * toggle between a card on file to a new card form
     */
    toggleCredit: function () {
      Ember.$('#card-on-file').toggleClass("hidden");
      Ember.$('#new-credit-card').toggleClass("hidden");

      let mode = this.get('mode');

      if (mode === 'file') {
        //switch from file to new
        this.set('toggleText', 'Use New Card');
        this.set('mode', 'new')

      } else {
        // switch from new to file
        this.set('toggleText', 'Use Card On File');
        this.set('mode', 'file');
      }
    }
  }
});
