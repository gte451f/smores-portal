import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

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

            if (isUserName) {
                var payload = {userName: model.get('userName')};
            } else {
                var payload = {email: model.get('email')};
            }

            $.ajax({
                url: ENV.APP.restNameSpace + "/auth/reminder",
                type: "POST",
                data: model
            }).then(function (response) {
                self.transitionTo('auth.reset');
                self.notify.success('Success!  Use the reset form to enter a new password for your account.', {closeAfter: 10000});
            }, function (error) {
                // error handler here
                self.notify.error('Error!...read the error here.', {closeAfter: 10000});
            });
        }
    }

});