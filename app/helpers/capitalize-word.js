import Ember from 'ember';

export function capitalizeWord(params/*, hash*/) {
  return params[0].capitalize();
}

export default Ember.Helper.helper(capitalizeWord);
