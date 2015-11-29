import Ember from 'ember';
// install simple-auth for all routes
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin, {
  session: Ember.inject.service(),

  /**
   * preload the authenticated users account
   *
   * @param params
   * @returns {*}
   */
  model: function (params) {
    //if the user is authenticated, pre-load their account data
    var accountId = this.get('session.secure.accountId');
    if (Ember.typeOf(accountId) === 'undefined') {
      // console.error('Could not load session account data!');
      // Notify.alert('Could not load your account data.  Please logout and log back into the system.');
      return {};
    } else {
      return this.store.findRecord('account', accountId);
    }
  },

  // default route?
  redirectsTo: 'dash',

  actions: {
    // show/hide sidebar
    showSidebar: function () {
      Ember.$('#mainWrapper').toggleClass('sidebar-collapse');
      Ember.$('#contentWrapper').toggleClass('sidebar-offset');
      console.log('sidebar called');
    },

    // support basic model component
    showModal: function (name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function () {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    // end basic model logic

    /**
     * redirect to login page if user lacks a valid session
     * TODO not sure this is needed
     */
    sessionInvalidationSucceeded: function () {
      if (!Ember.testing) {
        window.location.replace('auth/login');
      }
    },
    /**
     * logout action required by simple-auth
     */
    invalidateSession: function () {
      console.log('logout action caught');
      this.get('session').invalidate();
    },

  }
});