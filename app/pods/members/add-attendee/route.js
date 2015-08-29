import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

  model: function (params) {
    return {};
  },

  actions: {
    /**
     * create a new attendee record
     *
     * @param model
     */
    save: function (model) {
      var self = this;
      // set some default values
      model.userType = "Attendee";
      model.active = "1";

      var accountId = this.get('session.secure.accountId');
      model.account = this.store.getById('account', accountId);

      if (Ember.isEmpty(model.account)) {
        // error, no account detected
        this.notify.alert('An internal error occurred.  Please logout and log back into the system.');
        return false;
      }
      var newRecord = this.store.createRecord('attendee', model);
      newRecord.save().then(function (post) {
        self.notify.success('Camper Added');
        // reset to original position
        self.set('model', {});
        self.transitionTo('members.list');
      }, function (reason) {
        // roll back progress
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
