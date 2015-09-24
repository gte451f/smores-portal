import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  /**
   * load credit cards for display
   * @param params
   * @returns {*}
   */
  model: function (params) {
    var accountId = this.get('session.secure.accountId');

    if (Ember.isEmpty(accountId)) {
      // error, no account detected
      this.notify.alert('An internal error occurred.  Please logout and log back into the system.');
      return false;
    }
    return this.store.query('card', {account_id: accountId});
  },

  actions: {

    /**
     * delete a credit card from the server
     * @param card
     */
    delete: function (card) {
      var self = this;
      card.destroyRecord().then(function () {
        self.notify.success('Credit Card Removed');
      }, function (reason) {
        self.validationReport(card);
      });
    }
  }
});
