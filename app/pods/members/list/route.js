import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function (params) {
    var accountId = this.get('session.secure.accountId');
    return this.store.query('account', {with: 'owners,attendees', id: accountId});
  },

  setupController: function (controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }

});