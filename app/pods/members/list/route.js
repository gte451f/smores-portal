import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        return Ember.RSVP.hash({
            owners: this.store.find('owner', {account_id: 5}),
            attendees: this.store.find('attendee', {account_id: 5})
        });

    },

    setupController: function (controller, resolved) {
        this._super(controller, resolved);
    }

});