import Ember from 'ember';

export default Ember.Route.extend({
    // check wizard start detector
    activate: function () {
        var add = this.controllerFor('registrations.add');
        //var wizardToken = add.get('wizardToken');
        add.set('wizardToken', 'step1');
        return true;
    },
    model: function (params) {
        var currentAccountId = this.get('session.accountId');
        return Ember.RSVP.hash({
            model: {},
            attendees: this.store.find('attendee', {account_id: currentAccountId})
        });
    },
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);

        controller.set('attendees', resolved.attendees);
    }
});