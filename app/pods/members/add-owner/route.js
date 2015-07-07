import Ember from 'ember';
import Error from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(Error, {
    model: function (params) {
        return {phone: {primary: 1}, owner: {userType: 'Owner', active: true}};
    },
    actions: {
        save: function (model) {
            //first save the owner
            var self = this;
            var accountId = this.get('session.accountId');
            var account = this.store.getById('account', accountId);
            model.owner.account = account;

            var newOwner = this.store.createRecord('owner', model.owner);
            newOwner.save().then(function (data) {
                var that = self;
                //then save the phone
                model.phone.owner = newOwner;
                var newPhone = self.store.createRecord('owner-number', model.phone);
                newPhone.save().then(function () {
                    that.notify.success('Owner created');
                    that.transitionTo('members.list');
                }, function (reason) {
                    self.handleXHR(reason);
                });


            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
