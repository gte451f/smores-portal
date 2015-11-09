import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),

  //load up step1 for reference in template
  newRegistration: Ember.inject.service('new-registration'),

  //?
  //location: null,
  //event: null,

  // a basic request object...cookie meet cutter
  request: {
    location: null,
    event: null,
    program: null,
    note: null,
    priority: null
  },
  actions: {
    /**
     * add a new request to the local list
     */
    addRequest: function () {

      //requests in single mode should not exceed three
      var length = this.get('newRegistration.requests').length;
      if (length === 3) {
        this.get('notify').alert('Number of requests should not exceed: 3');
        return;
      }

      var requests = this.get('newRegistration.requests');
      var count = requests.length + 1;
      var requestContainer = this.get('request');
      requestContainer.priority = count;
      var request = Ember.Object.create(requestContainer);
      requests.pushObject(request);
    },

    /**
     * remove a request record from the local list and store?
     */
    removeRequest: function (object) {
      var requestList = this.get('newRegistration.requests');
      requestList.removeObject(object);

      // resort priority if in single mode
      var mode = this.get('newRegistration..mode');
      if (mode === 0) {
        var priority = 1;
        requestList.forEach(function (item) {
          item.set('priority', priority);
          priority = priority + 1;
        });

      }
    }
  }
});