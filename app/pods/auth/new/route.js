import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    //reset the model in case you return to add another record
    model: function () {
        return {password_confirm: null};
    },

    setupController: function (controller, model) {
        this._super(controller, model);

        controller.set('model.account', {userName: '', password: ''});
        controller.set('model.owner', {relationship: '', user: null});
        controller.set('model.user', {
            email: '',
            firstName: '',
            lastName: '',
            account: null,
            userType: 'Owner',
            gender: null
        });
        controller.set('model.ownerNumber', {number: '', primary: 1, phoneType: '', user: null});
    },

    actions: {
        // mega next account -> user -> owner -> ownerNumber
        save: function (model) {
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
                            self.notify.success('Success creating your account!!');
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
