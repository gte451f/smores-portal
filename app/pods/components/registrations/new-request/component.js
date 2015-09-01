import Ember from 'ember';


/**
 * A handy request selection component
 * Logic to chain select boxes together
 *
 */
export default Ember.Component.extend({

  // store the selected values as ID
  currentLocation: false,
  currentSession: false,

  currentEvent: false,
  currentPriority: false,

  // listbox state
  // should the following listboxes be enabled/disabled
  isSessionDisabled: true,
  isEventDisabled: true,

  // set some default values based on the supplied object
  setup: Ember.on("init", function () {
    console.log('component setup called');
    var event = this.get('request.event');
    if (event) {
      this.set('currentLocation', event.get('location.id'));
      this.set('currentSession', event.get('session.id'));
      this.buildSessions();
      this.buildEvents();
      this.set('isSessionDisabled', false);
      this.set('isEventDisabled', false);
    }
  }),

  request: null,

  // the actual list of objects fed into the select box
  filteredSessions: [],
  filteredEvents: [],

  //select list
  priorities: [1, 2, 3],

  // disable or enable and build list
  locationChanged: function (value, component) {
    console.log('Location Changed');
    var self = component.get('comp');
    console.log(value);
    if (value === false || value === null || value === undefined) {
      self.set('isSessionDisabled', true);
      return true;
    } else {
      self.set('isSessionDisabled', false);
      self.set('currentLocation', value);
      self.buildSessions();
      return false;
    }
  },

  // disable or enable and build list
  sessionChanged: function (value, component) {
    var self = component.get('comp');
    console.log('Session Changed');
    if (value === false || value === null || value === undefined) {
      self.set('isEventDisabled', true);
      return true;
    } else {
      self.set('isEventDisabled', false);
      self.set('currentSession', value);
      self.buildEvents();
      return false;
    }
  },

  // build a list of sessions based on previous choices
  buildSessions() {
    var currentLocation = this.get('currentLocation');
    var allEvents = this.get('events');
    var eventList = allEvents.filterBy('location.id', currentLocation);
    var sessionList = this.get('sessions');
    var finalList = [];
    sessionList.forEach(function (item) {
      var value = eventList.findBy('session', item);
      if (Ember.isEmpty(value)) {
        // do nothing
      } else {
        finalList.pushObject(item);
      }

    });

    // finally set the session list with the correct options
    this.set('filteredSessions', finalList);
  },

  // build a list of events based on previous choices
  buildEvents() {
    var currentLocation = this.get('currentLocation');
    var currentSession = this.get('currentSession');

    var allEvents = this.get('events');
    var eventList2 = allEvents.filterBy('location.id', currentLocation);
    var eventList3 = eventList2.filterBy('session.id', currentSession);

    var finalList = [];
    eventList3.forEach(function (item) {
      finalList.pushObject(item);
    });

    // finally set the session list with the correct options
    this.set('filteredEvents', eventList3);
  },
  actions: {
    /**
     * pass it out to controller to handle this record
     */
      removeRequest() {
      this.sendAction('action', this.get('request'));
    }
  }
});