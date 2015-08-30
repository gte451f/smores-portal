import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  //reset the model in case you return to add another record
  model: function (params) {
    return {};
  },

  actions: {

    /**
     *
     * @param model
     * @returns {boolean}
     */
    save: function (model) {
      var self = this;

      model.active = 1;

      var accountId = this.get('session.secure.accountId');
      model.account = this.store.getById('account', accountId);

      if (Ember.isEmpty(model.account)) {
        // error, no account detected
        this.notify.alert('An internal error occurred.  Please logout and log back into the system.');
        return false;
      }

      var newRecord = this.store.createRecord('card', model);
      newRecord.save().then(function (post) {
        self.notify.success('Card Added');
        self.set('model', {});
        self.transitionTo('cards');
      }, function (reason) {
        // roll back progress
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
