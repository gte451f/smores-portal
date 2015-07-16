import Ember from 'ember';

export function wizardStep(params/*, hash*/) {
  return params;
}

export default Ember.HTMLBars.makeBoundHelper(wizardStep);
