import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        var currentAccountId = this.get('session.secure.accountId');
        return this.store.query('registration', {'attendees:account_id': currentAccountId, with: 'all'});
    }
});