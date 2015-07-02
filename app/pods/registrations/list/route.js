import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        var currentAccountId = this.get('session.accountId');
        return this.store.find('registration', {'attendees:account_id': currentAccountId, with: 'all'});
    }
});