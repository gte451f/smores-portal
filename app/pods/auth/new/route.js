import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';
import ENV from 'smores-portal/config/environment';

export default Ember.Route.extend(ErrorHandler, {
    //reset the model in case you return to add another record
    model: function () {
        return {
            password_confirm: null,
            email: '',
            first_name: '',
            last_name: '',
            user_type: 'Owner',
            gender: null,
            relationship: '',
            user: null,
            password: '',
            number: '',
            primary: 1,
            phone_type: ''
        };
    },


    actions: {
        // mega next account -> user -> owner -> ownerNumber
        save: function (model) {
            var self = this;

            //validate here?

            $.ajax({
                url: ENV.APP.restNameSpace + "/auth/create",
                type: "POST",
                data: model
            }).then(function (response) {
                self.transitionTo('auth.activate');
                self.notify.success('Success creating your account!  Check your email for an activation code to enter on the next screen.', {closeAfter: 15000});
            }, function (error) {
                // error handler here
                // this handler assumes validation errors
                // until we get our error handling under control, show a standard error below
                self.handleXHR(error);
                // self.notify.error('Error!  The Username or Email provided does not match up with an eligible account.  Please try again with a valid Email or Username', {closeAfter: 10000});
            });

        },

        // mega next account -> user -> owner -> ownerNumber
        save2: function (model) {
            var self = this;

            var account = this.store.createRecord('account', model.account);
            account.save().then(function (newAccount) {
                var that = self;
                var user = self.store.createRecord('user', model.user);
                user.save().then(function (newUser) {
                    var them = that;
                    var owner = self.store.createRecord('owner', model.owner);
                    owner.set('user', user);
                    owner.set('account', account);
                    owner.save().then(function (newOwner) {
                        var those = them;
                        var ownerNumber = self.store.createRecord('owner-number', model.ownerNumber);
                        ownerNumber.set('user', user);
                        ownerNumber.save().then(function (newOwnerNumber) {
                            //redirect to new account page
                            those.transitionTo('auth.activate');
                            self.notify.success('Success creating your account!  Check your email for an activation code to enter on the next screen.', {closeAfter: 15000});
                        }, function (reason) {
                            //handle ownerNumber Failure
                            account.destroyRecord();
                            user.destroyRecord();
                            owner.destroyRecord();
                            self.handleXHR(reason);
                        });
                        //self.notify.success('Success adding owner !');
                    }, function (reason) {
                        //handle owner failure
                        account.destroyRecord();
                        user.destroyRecord();
                        self.handleXHR(reason);
                    });
                    //self.notify.success('Success adding account!');
                }, function (reason) {
                    //handle user failure
                    account.destroyRecord();
                    self.handleXHR(reason);
                });
                //self.notify.success('Success adding user!');
            }, function (reason) {
                //handle account failure
                self.handleXHR(reason);
            });
        }
    }
});
