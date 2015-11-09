import Ember from 'ember';
import ENV from 'smores-portal/config/environment';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    notify: Ember.inject.service(),

    //reset the model in case you return to add another record
    model: function () {
        return {email: null, code: null};
    },

    actions: {
        activate: function (model) {
            var self = this;
            Ember.$.ajax({
                url: ENV.APP.restNameSpace + "/auth/activate",
                type: "POST",
                data: model
            }).then(function (response) {
                self.transitionTo('auth.login');
                self.get('notify').success('Success!  Your account is activated.  Please proceed to login to the system.', {closeAfter: 15000});
            }, function (error) {
                // error handler here
                self.get('notify').error('Error!  The system was unable to process your activation request.  Please verify your credentials and try again.  If this problem persists, you may request a new secret code.', {closeAfter: 10000});
            });
        }
    }

});