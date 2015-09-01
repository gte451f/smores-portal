import Ember from 'ember';
import RouteAware from 'smores-portal/mixins/wizard/route-aware';
import RouteVal from 'smores-portal/mixins/wizard/route-val';

function routeVal(routeVals, prop) {
  return Ember.computed('currentPath', function () {
    var currentRoute = Ember.get(this, 'currentPath');
    var routeValues = Ember.get(this, routeVals);
    for (var i = 0; i < routeValues.length; i++) {
      if (routeValues[i].route === currentRoute) {
        return routeValues[i][prop];
      }
    }
  });
}

export default Ember.Controller.extend(RouteAware, {
  newRegistration: Ember.inject.service('new-registration'),

  routeValues: [
    RouteVal.create({
      route: 'registrations.add.step1',
      step: 'Choose Attendee',
      next: 'Step2',
      nextTransition: 'registrations.add.step2',
      prevTransition: 'registrations.add.step1',
      showNext: true,
      showPrev: false
    }),
    RouteVal.create({
      route: 'registrations.add.step2',
      step: 'Choose Events',
      next: 'Step3',
      prev: 'Step1',
      nextTransition: 'registrations.add.step3',
      prevTransition: 'registrations.add.step1',
      showNext: true,
      showPrev: true
    }),
    RouteVal.create({
      route: 'registrations.add.step3',
      step: 'Review',
      next: 'Make Another',
      prev: 'Step2',
      nextTransition: 'registrations.add.step3',
      prevTransition: 'registrations.add.step2',
      showNext: false,
      showPrev: true
    })
  ],
  nextButton: routeVal('routeValues', 'next'),
  prevButton: routeVal('routeValues', 'prev'),
  nextTransition: routeVal('routeValues', 'nextTransition'),
  showButtons: routeVal('routeValues', 'showButtons'),
  prevTransition: routeVal('routeValues', 'prevTransition'),
  showNext: routeVal('routeValues', 'showNext'),
  showPrev: routeVal('routeValues', 'showPrev'),
  actions: {
    next: function () {
      var currentRoute = Ember.get(this, 'currentPath');
      var newRegistration = this.get('newRegistration');

      if (currentRoute === 'registrations.add.step1') {
        if (Ember.isEmpty(this.get('newRegistration.camper'))) {
          this.notify.alert('Must select a camper before proceeding.');
          return;
        }
      }

      //only place I see to hook into validation
      if (currentRoute === 'registrations.add.step2') {
        if (this.get('newRegistration.requests').length === 0) {
          this.notify.alert('Must include at least on request before proceeding')
          return;
        }

        // TODO validate each request here

      }

      this.transitionToRoute(this.get('nextTransition'));
    },
    prev: function () {
      this.transitionToRoute(this.get('prevTransition'));
    }
  }
});

