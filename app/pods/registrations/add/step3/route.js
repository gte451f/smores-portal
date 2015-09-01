import Ember from 'ember';

export default Ember.Route.extend({
    newRegistration: Ember.inject.service('new-registration'),

    /**
     * look for page refresh activity and send them back to the start
     *
     * @returns {boolean}
     */
    activate: function () {
        if (this.get('newRegistration.wizardToken') === 'start') {
            this.transitionTo('registrations.add.step1');
        } else {
            this.get('newRegistration').set('wizardToken', 'step3');
        }
        return true;
    }
});
