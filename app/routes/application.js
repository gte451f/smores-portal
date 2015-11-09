import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
// import Notify from 'ember-notify';

export default Ember.Route.extend(ApplicationRouteMixin, {

  /**
   * preload the authenticated users account
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

  redirectsTo: 'dash',

  actions: {

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

    sessionInvalidationSucceeded: function () {
      if (!Ember.testing) {
        //this.transitionTo('auth.login');
        window.location.replace('auth/login');
      }
    }
  }
});