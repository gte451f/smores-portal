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

  this.route('registrations', function () {
    this.route('add', function () {
      this.route('step1');
      this.route('step2');
      this.route('step3');
    });
    this.route('list');
    this.route('info', {path: "/info/:registration_id"});
  });

  this.route('members', function () {
    this.route('list');
    this.route('add-attendee');
    this.route('add-owner');
    this.route('edit-owner', {path: "/edit-owner/:owner_id"});
    this.route('edit-attendee', {path: "/edit-attendee/:attendee_id"});
  });

  this.route('billing', function () {
    this.route('summary');
    this.route('add-payment');
    this.route('cards', function () {
      this.route('add');
      this.route('list');
    });

  });
});

export default Router;
