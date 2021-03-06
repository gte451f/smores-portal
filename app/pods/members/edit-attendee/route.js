import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  actions: {
    /**
     * update an existing attendee
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function () {
        self.transitionTo('members.list');
        self.get('notify').success('Camper Saved');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
