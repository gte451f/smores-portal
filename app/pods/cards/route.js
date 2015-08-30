import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  /**
   * load credit cards for display
   * @param params
   * @returns {*}
   */
  model: function (params) {
    return this.store.query('card', {account_id: params.account_id});
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
