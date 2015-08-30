import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

  // file|new
  // tell the system which way to process card data
  mode: 'file',

  /**
   * create a blank payment record & gather available credit cards
   * @param params
   * @returns {*}
   */
  model: function (params) {
    return Ember.RSVP.hash({
      model: {selectedCard: null, newCard: {}, amount: null, mode: 'file'},
      cards: this.store.query('card', {account_id: params.account_id})
    });
  },

  /**
   * format cards for display in select box
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);

    var cards = resolved.cards;
    cards.forEach(function (item) {
      item.set('name', item.get('vendor') + ' - ' + item.get('expirationMonth') + '/' + item.get('expirationYear'));
    });
    controller.set('model.cards', cards);
  },

  actions: {
    /**
     * gather payment information and post to api
     * who is responsible for saving to 3rd party gateway?
     *
     */
    save: function (model) {
      var self = this;

      var payment = {};
      payment.amount = model.amount;
      var accountId = this.get('session.secure.accountId');
      payment.account = this.store.peekRecord('account', accountId);

      var mode = model.mode;
      if (mode === 'file') {
        payment.card = model.selectedCard;
      } else {
        // what do we do with a new credit card that we only want for this payment?
      }

      var newRecord = this.store.createRecord('payment', payment);

      newRecord.save().then(function (post) {
        self.notify.success('Payment Saved');
        self.transitionTo('billing.summary');
      }, function (reason) {
        // roll back progress
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });

    }
  }

});
