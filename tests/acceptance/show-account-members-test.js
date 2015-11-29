import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'smores-portal/tests/helpers/start-app';

// load pretender service
// as well as a basic object of mock data
import Pretender from 'pretender';
import PretenderData from '../pretender-data/show-account-members';

import ENV from 'smores-portal/config/environment';
import getAppUrl from 'smores-common/utils/get-app-url';
import { authenticateSession } from 'smores-portal/tests/helpers/ember-simple-auth';

// hold pretender service
var server;

module('Acceptance | show account members', {
  beforeEach: function () {
    this.application = startApp();

    server = new Pretender(function pretenderInit() {
      // return a list of matters
      this.get(getAppUrl(ENV, '/accounts'), function () {
        return [200,
          {"Content-Type": "application/json"},
          JSON.stringify(PretenderData.accounts)];
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

test('able to load the member list page and display more than one owner/attendee', function (assert) {
  assert.expect(3);

  // authenticate via built in simple-auth helper
  authenticateSession(this.application, {
    "id": "103",
    "userName": "demo",
    "email": "demo@smores.camp",
    "token": "zAACcqEZCBJW6PVmm0kX6k5Wyd3q2Sbbe3IA8NCoFrXqXiYGO4YPmk0yHqJvuRgB",
    "userType": "owner",
    "accountId": 95
  });

  visit('/members/list');

  andThen(function () {
    assert.equal(currentURL(), '/members/list');
    assert.ok(find('.parent-list .list-group-item').length > 1);
    assert.ok(find('.camper-list .list-group-item').length > 1);
  });
});
