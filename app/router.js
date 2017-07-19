import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('auth', function () {
    this.route('login');
    this.route('reminder');
    this.route('reset');
    this.route('new');
    this.route('activate');
  });
});

export default Router;
