import ENV from 'smores-portal/config/environment';
import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import EphemeralStore from 'ember-simple-auth/session-stores/ephemeral';

if (ENV.environment === 'testing') {
  var store = EphemeralStore.extend();
} else {
var store = AdaptiveStore.extend({localStorageKey: 'ember_simple_auth:smores-portal'});
}
export default store;
