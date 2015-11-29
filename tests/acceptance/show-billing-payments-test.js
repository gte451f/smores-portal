import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'smores-portal/tests/helpers/start-app';

// load pretender service
// as well as a basic object of mock data
import Pretender from 'pretender';
import PretenderData from '../pretender-data/show-registrations-list';

import ENV from 'smores-portal/config/environment';
import getAppUrl from 'smores-common/utils/get-app-url';
import {  authenticateSession } from 'smores-portal/tests/helpers/ember-simple-auth';

// hold pretender service
var server;

module('Acceptance | show billing payments', {
  beforeEach: function () {
    this.application = startApp();

    server = new Pretender(function pretenderInit() {
      // return a list of matters
      this.get(getAppUrl(ENV, '/registrations'), function () {
        return [200,
          {"Content-Type": "application/json"},
          JSON.stringify(PretenderData.registrations)];
      });
      this.unhandledRequest = function (verb, path, request) {
        console.log("=== BEGIN UNHANDLED REQUEST ===");
        console.log('verb: ' + verb);
        console.log('path: ' + path);
        console.log('request: ' + request);
        console.log("=== END UNHANDLED REQUEST ===");
      };
    });
  },

  afterEach: function () {
    Ember.run(this.application, 'destroy');
  }
})
;

test('able to load the registration list page and display more than one registration', function (assert) {
  assert.expect(2);

  // authenticate via built in simple-auth helper
  authenticateSession(this.application, {
    "id": "103",
    "userName": "demo",
    "email": "demo@smores.camp",
    "token": "zAACcqEZCBJW6PVmm0kX6k5Wyd3q2Sbbe3IA8NCoFrXqXiYGO4YPmk0yHqJvuRgB",
    "userType": "owner",
    "accountId": 95
  });

  visit('/registrations/list');

  andThen(function () {
    assert.equal(currentURL(), '/registrations/list');
    assert.ok(find('.registration-list .list-group-item').length >= 1);
  });
});
