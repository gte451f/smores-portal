import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';
import ENV from 'smores-portal/config/environment';

export default Ember.Route.extend(ErrorHandler, {
    //reset the model in case you return to add another record
    model: function () {
        return {userName: null, email: null};
    },

    actions: {
        reminder: function (model) {
            var self = this;
            var isUserName = this.controllerFor('auth.reminder').get('isUserName');
            var isEmail = this.controllerFor('auth.reminder').get('isEmail');

            var foo = model;

            if (isUserName) {
                var payload = {userName: model.userName};
            } else {
                var payload = {email: model.email};
            }

            $.ajax({
                url: ENV.APP.restNameSpace + "/auth/reminder",
                type: "POST",
                data: model
            }).then(function (response) {
                self.transitionTo('auth.reset');
                self.notify.success('Success!  Check your email for a secret code and use it here to reset your password.', {closeAfter: 15000});
            }, function (error) {
                // error handler here
                // this handler assumes validation errors
                // until we get our error handling under control, show a standard error below
                // self.handleXHR(error);
                self.notify.error('Error!  The Username or Email provided does not match up with an eligible account.  Please try again with a valid Email or Username', {closeAfter: 10000});
            });
        }
    }

});