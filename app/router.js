import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('test');

  this.route('auth', function() {
    this.route('login');
    this.route('reminder');
    this.route('reset');
    this.route('new');
    this.route('activate');
  });
  this.route('me');
  this.route('dash');
});

export default Router;
