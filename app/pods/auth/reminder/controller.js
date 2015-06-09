import Ember from 'ember';

export default Ember.Controller.extend({
    isUserName: true,
    isEmail: false,

    actions: {
        showUserName: function () {
            Ember.$("#email-input").addClass("hidden");
            Ember.$("#userName-input").removeClass("hidden");

            Ember.$("#email-btn").removeClass("active");
            Ember.$("#userName-btn").addClass("active");

            this.set('isUserName', true);
            this.set('isEmail', false);
        },

        showEmail: function () {
            Ember.$("#email-input").removeClass("hidden");
            Ember.$("#userName-input").addClass("hidden");

            Ember.$("#email-btn").addClass("active");
            Ember.$("#userName-btn").removeClass("active");
            this.set('isUserName', false);
            this.set('isEmail', true);
        }

    }
});
