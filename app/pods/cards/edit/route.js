import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

  actions: {
    /**
     * update an existing credit card
     *
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.notify.success('Credit Card Saved');
        self.transitionTo('cards');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
