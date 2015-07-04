import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        var accountId = accountId = this.get('session.accountId');

        return this.store.find('account', {with: 'owners,attendees', id: accountId});
    },

    setupController: function (controller, resolved) {
        var model = resolved.get('firstObject');
        this._super(controller, model);
    }

});