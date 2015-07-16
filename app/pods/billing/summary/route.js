import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        var currentAccountId = this.get('session.accountId');
        if (currentAccountId > 0) {
            return this.store.find('account', {id: currentAccountId, with: 'all'});
        } else {
            this.notify.error('Could not load your account!');
            this.transitionTo('dash');
        }
    },

    setupController: function (controller, resolved) {
        var model = resolved.get('firstObject');
        this._super(controller, model);
    }
});