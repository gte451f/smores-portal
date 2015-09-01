import Ember from 'ember';

export default Ember.Route.extend({

  newRegistration: Ember.inject.service('new-registration'),

  /**
   * set wizard token since this is the start
   *
   * @returns {boolean}
   */
  activate: function () {
    this.get('newRegistration').set('wizardToken', 'step1');
    return true;
  },
  /**
   * load all relevant attendees
   * @param params
   * @returns {*}
   */
  model: function (params) {
    var currentAccountId = this.get('session.secure.accountId');
    return Ember.RSVP.hash({
      model: {},
      attendees: this.store.query('attendee', {account_id: currentAccountId})
    });
  },

  /**
   * pass attendess to controller
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);
    controller.set('attendees', resolved.attendees);
  }
});