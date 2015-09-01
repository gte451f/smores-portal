import Ember from 'ember';

export default Ember.Controller.extend({
  newRegistration: Ember.inject.service('new-registration'),

  actions: {
    save: function () {
      var self = this;
      var newRegistration = this.get('newRegistration');

      //first save a registration
      var data = {
        attendee: this.get('newRegistration.camper'),
        notes: this.get('newRegistration.registrationNote')
      };
      var registration = this.store.createRecord('registration', data);

      var subItems = [];

      // a function to save a sub-item
      var subItemSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      function success(post) {
        var that = self;

        //now add requests for the registration
        var requests = self.get('newRegistration.requests');
        var requestCount = requests.length;
        var registrationId = post.get('id');

        requests.forEach(function (item, index, enumerable) {
          var data = {
            event: item.get('event'),
            registration: post,
            priority: item.get('priority'),
            note: item.get('note')
          };
          var request = self.store.createRecord('request', data);
          subItems.push(subItemSave(request));
        }, this);

        Ember.RSVP.all(subItems).then(function () {
          // reset registration wizard
          that.get('newRegistration').resetRegistration();
          self.notify.success('Success saving registration including ' + requestCount + ' individual requests.');
          self.transitionToRoute('registrations.info', registrationId);
        }, failure);
      }

      function failure(reason) {
        // handle the error
        //var foo = reason.responseJSON;
        var errorHTML = '<strong>' + reason.responseJSON.records.userMessage + '</strong> <br/>';
        reason.responseJSON.records.validationList.forEach(function (item) {
          errorHTML = errorHTML + item.message + '<br/>';
        }, this);

        self.notify.warning({raw: errorHTML});
      }

      registration.save().then(success, failure);
    }
  }
});
