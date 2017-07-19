import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';
import ENV from 'smores-portal/config/environment';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {
      password_confirm: null,
      email           : '',
      first_name      : '',
      last_name       : '',
      user_type       : 'Owner',
      gender          : null,
      relationship    : '',
      user            : null,
      password        : '',
      number          : '',
      primary         : 1,
      phone_type      : ''
    };
  },

  actions: {
    // use a custom function to create the record
    // partially because most end points are blocked until the user authenticates
    save: function (model) {
      var self = this;

      //validate here?

      Ember.$.ajax({
        url : ENV.APP.restNameSpace + "/auth/create",
        type: "POST",
        data: model
      }).then(function (response) {
        self.transitionTo('auth.activate');
        self.get('notify').success('Success creating your account!  Check your email for an activation code to enter on the next screen.', { closeAfter: 15000 });
      }, function (error) {
        self.handleXHR(error);
      });

    }
  }
});
