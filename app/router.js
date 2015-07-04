import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
  this.route('test');

  this.route('auth', function () {
      this.route('login');
      this.route('reminder');
      this.route('reset');
      this.route('new');
      this.route('activate');
  });
  this.route('me');
  this.route('dash');

  this.route('member', function () {
      this.route('list');
  });

  this.route('members', function () {
      this.route('list');
      this.route('add-attendee');
      this.route('add-owner');
      this.route('edit-owner', {path: "/edit-owner/:owner_id"});
      this.route('edit-attendee', {path: "/edit-attendee/:attendee_id"});
  });

  this.route('registrations', function() {
    this.route('list');
  });

  this.route('billing', function() {
    this.route('summary');
  });
});

export default Router;
