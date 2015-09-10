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
      next: 'Step 2',
      nextTransition: 'registrations.add.step2',
      prevTransition: 'registrations.add.step1',
      showNext: true,
      showPrev: false
    }),
    RouteVal.create({
      route: 'registrations.add.step2',
      step: 'Choose Events',
      next: 'Step 3',
      prev: 'Step 1',
      nextTransition: 'registrations.add.step3',
      prevTransition: 'registrations.add.step1',
      showNext: true,
      showPrev: true
    }),
    RouteVal.create({
      route: 'registrations.add.step3',
      step: 'Review',
      next: 'Make Another',
      prev: 'Step 2',
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

    /**
     * a central place to process requests for the next step
     * also holds a list of validation steps for each step in the process
     */
    next: function () {
      var currentRoute = Ember.get(this, 'currentPath');
      var newRegistration = this.get('newRegistration');
      var self = this;

      if (currentRoute === 'registrations.add.step1') {
        if (Ember.isEmpty(this.get('newRegistration.camper'))) {
          this.notify.alert('Must select a camper before proceeding.');
          return;
        }
      }

      // verify data coming out of step2 works
      if (currentRoute === 'registrations.add.step2') {
        if (this.get('newRegistration.requests').length === 0) {
          this.notify.alert('Must include at least on request before proceeding')
          debugger;
          return;
        }

        // verify that each request is fully completed
        var requests = this.get('newRegistration.requests');
        var proceed = true;
        requests.forEach(function (item) {
          if (Ember.isEmpty(item.get('priority'))) {
            self.notify.alert('Each request must have a valid priority');
            proceed = false;
          }

          if (Ember.isEmpty(item.get('event'))) {
            self.notify.alert('Each request must have a selected Program/Cabin selected.');
            proceed = false;
          }
        });

        //use this to exit processing the action if validation fails
        if (proceed === false) {
          return;
        }
      }

      this.transitionToRoute(this.get('nextTransition'));
    },
    prev: function () {
      this.transitionToRoute(this.get('prevTransition'));
    }
  }
});

