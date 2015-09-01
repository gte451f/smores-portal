import Ember from 'ember';

export default Ember.Controller.extend({
  newRegistration: Ember.inject.service('new-registration'),
});
