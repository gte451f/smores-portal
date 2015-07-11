import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {


    model: function (params) {
        //if the user is authenticated, pre-load their account data
        var accountId = this.get('session.accountId');
        if (Ember.typeOf(accountId) === 'undefined') {
            return {};
        } else {
            return this.store.find('account', accountId);

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