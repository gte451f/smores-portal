import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service(),

  model: function (params) {
    var currentAccountId = this.get('session.secure.accountId');
    if (currentAccountId > 0) {
      return this.store.query('account', {id: currentAccountId, with: 'all'});
    } else {
      this.get('notify').error('Could not load your account!');
      this.transitionTo('dash');
    }
  },

  setupController: function (controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }
});