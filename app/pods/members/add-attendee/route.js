import Ember from 'ember';
import ErrorHandler from 'smores-portal/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

    model: function (params) {
        return {active: true};
    },

    actions: {
        save: function (model) {
            var self = this;
            model.userType = "Attendee";
            var accountId = this.get('session.accountId');
            // var account = this.store.find('account', accountId);
            var account = this.store.getById('account', accountId);

            model.account = account;
            var newRecord = this.store.createRecord('attendee', model);
            newRecord.save().then(function (post) {
                self.notify.success('Success adding new camper');
                self.transitionTo('members.list');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
