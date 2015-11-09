import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),

  newRegistration: Ember.inject.service('new-registration'),

  actions: {
    /**
     * gather all data from the wizard and issue a save
     */
    save: function () {
      var self = this;

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

      /**
       * success handler for save action
       * @param post
       */
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
          self.get('notify').success('Success saving registration including ' + requestCount + ' individual requests.');
          self.transitionToRoute('registrations.info', registrationId);
        }, failure);
      }

      /**
       * handle an error in saving the new registration record
       * @param reason
       */
      function failure(reason) {
        var errorHTML = '<strong>' + reason.responseJSON.records.userMessage + '</strong> <br/>';
        reason.responseJSON.records.validationList.forEach(function (item) {
          errorHTML = errorHTML + item.message + '<br/>';
        }, this);
        self.get('notify').warning({raw: errorHTML});
      }

      // it's go time, perform the save
      registration.save().then(success, failure);
    } // end save function
  }
});
